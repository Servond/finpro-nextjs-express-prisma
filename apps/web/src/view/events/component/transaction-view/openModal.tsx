import React from 'react';
import { IModalProps } from '@/interface/event.interface';

const Modal: React.FC<IModalProps> = ({ onClose, isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <div className="relative bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 pt-4 pr-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition ease-in-out duration-150"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-4 border-b pb-4">
            Checkout Summary
          </h2>
          <div className="text-left">{children}</div>
          <div className="flex justify-center mt-6">

          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
