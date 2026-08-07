'use client';

import { createContext, useState, type ReactNode } from "react";

export type BookingModalType = "hourly" | "day_pass" | "";

type ModalContextValue = {
  modalOpen: BookingModalType;
  handleOpenModal: (bookingType: string | null | undefined) => void;
  handleCloseModal: () => void;
};

export const ModalContext = createContext<ModalContextValue>({
  modalOpen: "",
  handleOpenModal: () => {},
  handleCloseModal: () => {},
});

export function normalizeBookingType(
  bookingType: string | null | undefined
): BookingModalType {
  const normalized = bookingType?.trim().toLowerCase().replace(/[\s-]+/g, "_");

  if (normalized === "hourly" || normalized === "houlry") return "hourly";
  if (normalized === "day_pass" || normalized === "daypass") return "day_pass";

  return "";
}

type ModalContextProviderProps = {
  children: ReactNode;
};

export function ModalContextProvider({ children }: ModalContextProviderProps) {
  const [modalOpen, setModalOpen] = useState<BookingModalType>("");

  function handleOpenModal(bookingType: string | null | undefined) {
    setModalOpen(normalizeBookingType(bookingType));
  }

  function handleCloseModal() {
    setModalOpen("");
  }

  const value = { modalOpen, handleOpenModal, handleCloseModal };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
