"use client";

import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/lib/context/modal-context";
import { Workspace } from "@/types/workspace";
import Modal from "./Modal";
import HourlyCalendar from "../booking/hourly/HourlyCalendar";
import HourlyDetails from "../booking/hourly/HourlyDetails";
import ConfirmDetails from "../booking/ConfirmDetails";
import { useAuth } from "@/util/hooks/useAuth";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { createBooking } from "@/lib/db/client-query";
import { Booking } from "@/types/booking";
import { totalMinutes } from "@/lib/booking/availability";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { format } from 'date-fns';


type HourlyModalProps = {
  selectedWorkspace: Workspace | null;
  isOpen: boolean;
};

type BookingData = Omit<Booking, "id">;

const HourlyModal = ({ selectedWorkspace, isOpen }: HourlyModalProps) => {
  const { handleCloseModal } = useContext(ModalContext);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedStartTime, setSelectedStartTime] = useState<string | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<string>("select end time");
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [onSuccess, setOnSuccess] = useState<boolean>(false);
  const { user} = useAuth();
  const queryClient = useQueryClient();
  const {mutate, reset, isPending, isError} = useMutation({
      mutationFn: (bookingData: BookingData) => {
          return new Promise<void>((resolve, reject) => {
            setTimeout (async () => {
              try {
                await createBooking(bookingData);
                resolve();
              } catch (error) {
                reject(error);
              }
            }, 5000);
          });
      },
      onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setOnSuccess(true);
      toast.success("Booking Successful!", {
      description: "you have successfully made your booking",
      icon: <CheckCircle2 className="h-5 w-5 text-app-primary" />
    })
    },
  });
  const workImage = selectedWorkspace?.workspace_images?.[0];

  useEffect(() => {
    if (!isOpen || !selectedWorkspace) {
      setSelectedDate(undefined);
      setSelectedStartTime(null);
      setSelectedEndTime("select end time");
      setTotalPrice(null);
      setIsConfirm(false);
      setOnSuccess(false);
      if (typeof reset === "function") reset();
    }
  }, [isOpen, selectedWorkspace?.id, reset]);

  if (!selectedWorkspace) return null;

  function handleConfirm() {
    setIsConfirm(true);
  }

  function handleBackToBooking() {
    setIsConfirm(false);
    setOnSuccess(false);
  }

  function handlePayNow () {
      if (!user) {
        console.error("User is not authenticated.");
        return;
      }

      if (isPending) {
        return;
      }
  
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const today = `${year}-${month}-${day}`;
      const currTime = now.toTimeString().slice(0, 5);
      const bookingDate = selectedDate
      ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
      : '';
      const isToday = bookingDate === today;
  
      mutate({
        workspace_id: selectedWorkspace?.id ?? "",
        user_id: user?.id,
        booking_date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
        booking_type: 'hourly',
        start_time: selectedStartTime ?? '08:00',
        end_time: selectedEndTime ?? '17:00',
        total_price: totalPrice ?? 0,
        status: isToday && totalMinutes(currTime) >=  totalMinutes(selectedStartTime ?? '08:00') ? "active" : "upcoming",
        team_size: selectedWorkspace?.capacity_max  ?? 1
      });
    }

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <div>

        {isError && !isPending && isConfirm && (
          <div className="text-red-600 border border-b-2 p-1 mb-2 text-sm font-medium">
            <AlertCircle className="inline-block h-4 w-4 mr-1.5" />
            <span>An error occurred while processing your request.</span>
          </div>
        )}

        {isConfirm ? (
          <ConfirmDetails
            selectedWorkspace={selectedWorkspace}
            bookingType="hourly"
            selectedDate={selectedDate}
            teamSize={selectedWorkspace.capacity_max}
            startTime={selectedStartTime ?? ""}
            endTime={selectedEndTime}
            totalPrice={totalPrice}
            onBack={handleBackToBooking}
            onPay={handlePayNow}
            onSuccess={onSuccess}
            isPending={isPending}
          />
        ) : (
       <>
        <section className="flex items-center justify-between border-b border-b-app-primary pb-4 mb-5">
         <div className="space-y-1">
          <h1 className="font-bold">{selectedWorkspace.name}</h1>
          <img
            src={workImage?.image_path ?? ""}
            alt={workImage?.alt_text ?? selectedWorkspace.name}
            className="h-14 w-20 rounded-md"
          />
         </div>
         <div className="flex items-center gap-5">
          <div className="text-sm space-y-0.5">
            <p>Capacity;</p>
            <p className="font-bold text-[12px] text-app-neutral">
              {selectedWorkspace.capacity_min === selectedWorkspace.capacity_max
                ? `${selectedWorkspace.capacity_min} person`
                : `${selectedWorkspace.capacity_min}-${selectedWorkspace.capacity_max} persons`}
            </p>
          </div>
          <button className="bg-app-primary text-app-tertiary rounded-full px-4 py-2 cursor-pointer" onClick={handleCloseModal}>
            X
          </button>
         </div>
        </section>

        <HourlyCalendar selected={selectedDate} onSelect={setSelectedDate} />

        <HourlyDetails
          selectedDate={selectedDate}
          selectedWorkspace={selectedWorkspace}
          selectedStartTime={selectedStartTime}
          selectedEndTime={selectedEndTime}
          onSelectStartTime={setSelectedStartTime}
          onSelectEndTime={setSelectedEndTime}
          totalPrice={totalPrice}
          onSetTotalPrice={setTotalPrice}
          onConfirm={handleConfirm}
        />
       </>
        )}
      </div>
    </Modal>
  );
};

export default HourlyModal;
