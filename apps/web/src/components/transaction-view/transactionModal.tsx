import React, { useState } from 'react';
import Modal from './openModal';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTickets: any[];
  eventTickets: any[];
  totalPrice: number;
  discountPercentage: number;
  voucherCode: string;
  voucherMessage: string;
  setVoucherCode: React.Dispatch<React.SetStateAction<string>>;
  setDiscountPercentage: React.Dispatch<React.SetStateAction<number>>;
  setVoucherMessage: React.Dispatch<React.SetStateAction<string>>;
  handleApplyVoucher: () => void;
  calculateDiscountedPrice: (total: number) => number;
  formatPrice: (price: number | null | undefined) => string;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  selectedTickets,
  eventTickets,
  totalPrice,
  voucherCode,
  voucherMessage,
  setVoucherCode,
  setDiscountPercentage,
  setVoucherMessage,
  handleApplyVoucher,
  calculateDiscountedPrice,
  formatPrice,
}) => {
  const handleCheckout = async () => {
    try {
      alert('Proceed to Checkout Succeed');
      const response = await fetch('http://localhost:3080/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: eventTickets[0]?.eventId,
          tickets: selectedTickets,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to proceed to checkout');
      }

      const result = await response.json();
      onClose();
    } catch (error) {}
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="px-10 py-10 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
          <div className="text-right">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          {selectedTickets.length > 0 ? (
            <div>
              <p className="text-xl font-bold mb-2">Your selected tickets:</p>
              <ul className="mb-4">
                {selectedTickets.map((ticket) => {
                  const selectedTicketType = eventTickets.find(
                    (t: { id: any }) => t.id === ticket.id,
                  );
                  if (!selectedTicketType) return null;

                  return (
                    <li key={ticket.id}>
                      {ticket.count}x {selectedTicketType.type} -{' '}
                      {formatPrice(ticket.price)}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Voucher Code
                </label>
                <div className="flex mt-1">
                  <input
                    type="text"
                    className="p-2 flex-grow border border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your voucher code"
                    value={voucherCode}
                    onChange={(e) => {
                      setVoucherCode(e.target.value);
                      if (!e.target.value) {
                        setDiscountPercentage(0);
                        setVoucherMessage('');
                      }
                    }}
                  />
                  <button
                    onClick={handleApplyVoucher}
                    className="p-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-500"
                  >
                    Apply
                  </button>
                </div>
                {voucherMessage && (
                  <p className="text-sm mt-2">{voucherMessage}</p>
                )}
              </div>

              <hr className="my-6 border-gray-300 mb-7" />
              <p className="text-lg font-semibold mt-6 mb-6 pb-6">
                Total Price: {formatPrice(calculateDiscountedPrice(totalPrice))}
              </p>
              <div className="flex justify-center mt-6">
                <button
                  onClick={onClose}
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mr-4 transition ease-in-out duration-150"
                >
                  Close
                </button>
                <button
                  onClick={handleCheckout}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-150"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg font-bold">
                Please select your ticket type first
              </p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default TransactionModal;
