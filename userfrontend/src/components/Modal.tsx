import React from "react";

interface ModalProps {
  userwallet: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  userwallet,
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 내용 */}
        <div className="p-4">
          <label
            htmlFor="wallet"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            wallet
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <input
              type="text"
              name="wallet"
              id="wallet"
              className="block w-full rounded-md border-0 py-2 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-5"
              placeholder={userwallet}
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
