import React, { useEffect, useState } from "react";
import web3 from "web3";
import Modal from "../../../components/Modal";

interface UserWalletProps {
  wallet: string | undefined;
}

const MyWallet: React.FC<UserWalletProps> = ({ wallet }) => {
  const [shortWallet, setShortWallet] = useState<string>("");
  const [user, setUser] = useState({ account: "", balance: "" });
  const [web3, setWeb3] = useState(null);
  const [walletregist, setWalletregist] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const shortenWalletAddress = (address: string, chars = 4) => {
    return `${address.substring(0, chars + 2)}...${address.substring(
      address.length - chars
    )}`;
  };

  useEffect(() => {
    if (wallet) {
      setShortWallet(shortenWalletAddress(wallet));
    }
    // console.log(typeof shortWallet);
  }, [wallet]);

  // 클립보드에 복사하기
  const copyUserWallet = () => {
    if (wallet) {
      navigator.clipboard
        .writeText(wallet)
        .then(() => {
          alert("지갑 주소가 클립보드에 저장되었습니다.");
        })
        .catch((err) => {
          console.error(
            "지갑 주소가 복사되지 않았습니다. 다시 한번 눌러보세요"
          );
        });
    }
  };

  // 메타마스크 연결
  const connectWallet = () => {
    // 메타마스크가 설치 되어 있는지 확인 있으면 연결된 지갑 주소를 저장
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((data: string) => {
          // console.log(data);
          setWalletregist(data);
        });
      setShowModal(true);
    } else {
      alert("메타마스크 설치가 필요합니다.");
    }
  };

  // 모달을 여닫는 함수
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal
          userwallet={walletregist[0]}
          isOpen={showModal}
          onClose={handleClose}
        >
          <p className="pl-5 text-base font-bold  mb-2">주의</p>
          <p className="pl-5 text-sm">
            현재 연결 되어 있는 메타마스크 지갑과 연동됩니다.
          </p>
          <p className="pl-5 text-sm">
            한번 입력한 주소는 바꾸 실 수 없습니다.
          </p>
        </Modal>
      )}
      {shortWallet === "" ? (
        <div
          className="w-full h-[10%] flex justify-center items-end"
          onClick={connectWallet}
        >
          Please connect your wallet
        </div>
      ) : (
        <div
          className="w-full h-[10%] flex justify-center items-end"
          onClick={copyUserWallet}
        >
          <svg
            className="mr-2"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {shortWallet}
        </div>
      )}
    </>
  );
};

export default MyWallet;
