'use client';

import { Toaster } from 'sonner';
const ToastProvider = () => {

  return (
    <Toaster
    position='top-right'
    closeButton
    duration={5000}
    toastOptions={{
        className: 'border shadow-md rounded-xl p-4 flex gap-3 w-full max-w-sm',
        descriptionClassName: "text-base font-normal mt-1 layout-desc",

        classNames: {
            success: "bg-app-secondary/35 text-app-tertiary border-app-primary",
            error: 'bg-red-50 text-red-900 border-red-100',
            description: 'text-current/70 text-[14px]',
            closeButton: 'bg-app-tertiary text-app-primary/50 hover:text-app-primary/70 cursor-pointer border border-app-primary/20 shadow-sm'
        }
    }}
     />
  )
}

export default ToastProvider;
