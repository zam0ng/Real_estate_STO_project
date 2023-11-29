import { useEffect, useState } from "react";

const useAccount = () => {
  const [account, setAccount] = useState<string>("");

  const getAccount = async () => {
    try {
      if (!window.ethereum) throw new Error("Error : no metamask");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts && Array.isArray(accounts)) {
        setAccount(accounts[0]);
      }
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  return { account };
};

export default useAccount;