"use client";

import { useContext, useState, useEffect } from "react";
import { ModalContext } from "@/lib/context/modal-context";
import { Workspace } from "@/types/workspace";
import Modal from "./Modal";
import DayBookingWrapper from "../booking/day/DayBookingWrapper";
import DayBooking from "../booking/day/DayBooking";
import DayIndicator from "../booking/day/DayIndicator";
import CapacityAndPriceDisplay from "../booking/day/CapacityAndPriceDisplay";
import ConfirmButton from "../booking/ConfirmButton";
import ConfirmDetails from "../booking/ConfirmDetails";
import { useMutation, useQueryClient} from "@tanstack/react-query";
import { createBooking } from "@/lib/db/client-query";
import { Booking } from "@/types/booking";
import { useAuth } from "@/util/hooks/useAuth";
import { totalMinutes } from "@/lib/booking/availability";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { format } from 'date-fns';

type DayModalProps = {
  selectedWorkspace: Workspace | null;
  isOpen: boolean;
};

type BookingData = Omit<Booking, "id">;

const getDayPassPrice = (workspace: Workspace, teamSize = workspace.capacity_max) => {
  const basePrice = workspace.daily_base_price ?? 0;
  const maxCapacity = workspace.capacity_max || 1;

  if (teamSize === maxCapacity) {
    return basePrice;
  }

  const price = (basePrice * teamSize) / maxCapacity;
  return Math.round(price / 100) * 100;
};

const DayModal = ({ selectedWorkspace, isOpen }: DayModalProps) => {
  const {  handleCloseModal } = useContext(ModalContext);

  if (!selectedWorkspace) return null;

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <DayModalContent
        key={selectedWorkspace.id}
        selectedWorkspace={selectedWorkspace}
        onClose={handleCloseModal}
        isOpen={isOpen}
      />
    </Modal>
  );
};

type DayModalContentProps = {
  selectedWorkspace: Workspace;
  onClose: () => void;
  isOpen: boolean;
};

const DayModalContent = ({ selectedWorkspace, onClose, isOpen }: DayModalContentProps) => {
  const [selectedTeamSize, setSelectedTeamSize] = useState<number | null>(
    selectedWorkspace.capacity_max
  );
  const [totalPrice, setTotalPrice] = useState<number | null>(
    getDayPassPrice(selectedWorkspace)
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isWrapperLoading, setIsWrapperLoading] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
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

  useEffect(() => {
    if (!isOpen) {
      if (typeof reset === "function") reset();
      setIsConfirm(false);
      setOnSuccess(false);
    }
  }, [isOpen]);

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
      workspace_id: selectedWorkspace.id,
      user_id: user?.id,
      booking_date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
      booking_type: 'day_pass',
      start_time: '08:00',
      end_time: '17:00',
      total_price: totalPrice ?? 0,
      status: isToday && totalMinutes(currTime) >=  totalMinutes("8:00") ? "active" : "upcoming",
      team_size: selectedTeamSize
    });
  }

  function handleSelectSize(teamSize:number) {
    setSelectedTeamSize(teamSize);
    setTotalPrice(getDayPassPrice(selectedWorkspace, teamSize));
  };

  function handleConfirm() {
    setIsConfirm(true);
  }

  function handleBackToBooking() {
    setIsConfirm(false);
  };

  const workImage = selectedWorkspace?.workspace_images?.[0];

  return (
      <div className="w-full space-y-4">
        {isError && !isPending && isConfirm && (
          <div className="text-red-600 border border-b-2 p-1 mb-2 text-sm font-medium">
            <AlertCircle className="inline-block h-4 w-4 mr-1.5" />
            <span>An error occurred while processing your request.</span>
          </div>
        )}
          {isConfirm ? (
            <ConfirmDetails
              selectedWorkspace={selectedWorkspace}
              bookingType="day_pass"
              selectedDate={selectedDate}
              teamSize={selectedTeamSize}
              startTime="8:00"
              endTime="17:00"
              totalPrice={totalPrice}
              onBack={handleBackToBooking}
              onPay={handlePayNow}
              isPending={isPending}
              onSuccess={onSuccess}
            />
          ) : (
            <div className="space-y-3">
              <section className="flex flex-col gap-4 border-b border-app-primary/30 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <h1 className="text-lg font-bold text-app-primary">{selectedWorkspace.name}</h1>
                  <img
                  src={workImage?.image_path ?? ""}
                  alt={workImage?.alt_text ?? selectedWorkspace.name}
                  className="h-16 w-24 rounded-md object-cover"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <div className="text-sm space-y-0.5">
                    <p className="font-medium text-app-neutral">Capacity:</p>
                    <p className="font-bold text-[12px] text-app-neutral">
                      {selectedWorkspace.capacity_min === selectedWorkspace.capacity_max
                      ? `${selectedWorkspace.capacity_min} person`
                      : `${selectedWorkspace.capacity_min}-${selectedWorkspace.capacity_max} persons`}
                    </p>
                  </div>
                  <button
                  className="rounded-full bg-app-primary px-3 py-1.5 text-sm font-semibold text-app-tertiary transition hover:opacity-90"
                  onClick={onClose}
                  aria-label="Close day-pass booking modal"
                  >
                    ✕
                  </button>
                </div>
              </section>

              <div className="space-y-1">
                <h2 className="text-base font-semibold text-app-primary">Select a day</h2>
                <p className="text-sm text-app-neutral">Choose an available date for your day-pass booking.</p>
              </div>

              <DayBookingWrapper isWrapperLoading={isWrapperLoading}>
                <DayBooking
                  selectedWorkspace={selectedWorkspace}
                  onLoadingChange={setIsWrapperLoading}
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                />
                <DayIndicator />
                <CapacityAndPriceDisplay
                  selectedWorkspace={selectedWorkspace}
                  selectedTeamSize={selectedTeamSize}
                  onCapacitySelect={handleSelectSize}
                  totalPrice={totalPrice}
                />
                <ConfirmButton
                  selectedDate={selectedDate}
                  teamSize={selectedTeamSize}
                  startTime="8:00"
                  endTime="17:00"
                  bookingType="day_pass"
                  onConfirm={handleConfirm}
                />
              </DayBookingWrapper>
            </div>
          )}
      </div>
  );
};

export default DayModal;
