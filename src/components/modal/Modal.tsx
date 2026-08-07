"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
  open?: boolean;
  onClose?: () => void;
};

export default function Modal({ children, open = false, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modal = modalRef.current;

    if (!modal) return;

    if (open) {
      if (!modal.open) {
        modal.showModal();
      }
      document.body.classList.add('overflow-hidden');
    } else {
      modal.close();
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      modal.close();
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;
  const modalRoot = document.getElementById("modal") ?? document.body;

  return createPortal(
    <dialog
      ref={modalRef}
      onClose={onClose}
      className="relative m-auto w-[92vw] max-w-2xl max-h-[calc(100vh-2rem)] overflow-y-auto scrollbar-thin scrollbar-track-app-primary/0 scrollbar-thumb-app-primary/85 rounded-2xl bg-app-tertiary p-4 shadow-2xl sm:p-6 md:p-7 backdrop:backdrop-blur-xl"
    >
      {children}
    </dialog>,
    modalRoot
  );
}
