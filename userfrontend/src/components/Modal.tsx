import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { serverurl } from "./serverurl";
import { Cookies } from "react-cookie";
import LoadingComponent from "./LoadingComponent";

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
  const queryClient = useQueryClient();
  // if (!isOpen) return null;

  const cookies = new Cookies();

  const isCookie = cookies.get("accessToken");

  const handleWallet = async (userwallet: string) => {
    const { data } = await axios.post(`${serverurl}/mypage/regist_wallet`, {
      token: isCookie,
      wallet: userwallet,
    });
    return data;
  };

  const mutation = useMutation({
    mutationFn: () => handleWallet(userwallet),
    onSuccess: (data) => {
      alert("지갑 연결 완료");
      onClose();
      queryClient.refetchQueries({ queryKey: ["userInfoFetch"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const close = () => {
    mutation.mutate();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        {mutation.isPending ? (
          <LoadingComponent />
        ) : (
          <>
            <div className="p-4">
              <label
                htmlFor="wallet"
                className="block leading-6 text-gray-900 text-base font-bold"
              >
                지갑 등록
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
            <div className="flex justify-end w-full space-x-4 pr-5 pb-3">
              <div
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-opacity-50 text-sm"
                role="button"
                tabIndex={0}
                onClick={onClose}
                onKeyDown={(e) => e.key === "Enter"}
              >
                취소
              </div>
              <div
                className="bg-blue-200 text-blue-800 px-4 py-2 rounded hover:bg-blue-300 focus:outline-none focus:ring-opacity-50 text-sm"
                role="button"
                tabIndex={0}
                onClick={close}
                onKeyDown={(e) => e.key === "Enter"}
              >
                확인
              </div>
            </div>
          </>
        )}
      </div>
      {/*  */}
    </div>
  );
};

export default Modal;
