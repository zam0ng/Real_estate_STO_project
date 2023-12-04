import { useEffect, useState } from "react";
import Web3 from "web3";

interface User {
    account: string;
    balance: string;
}

declare global {
    interface Window {
        ethereum: any;
    }
}

const useWeb3 = ()=>{
    const [user,setUser] = useState<User>({
        account : "",
        balance : "",
    });

    const [web3,setWeb3] = useState<Web3 | null>(null);

    useEffect(()=>{
        console.log(typeof window.ethereum);
        console.log("++++++++++++++++++++++=");
        if(window.ethereum){
            window.ethereum.request({method:"eth_requestAccounts"})
            .then(async ([data]: string[]) => {
                const web3Provider = new Web3(window.ethereum);
                setUser({
                    account : data,
                    balance : web3Provider.utils.fromWei(await web3Provider.eth.getBalance(data),"ether"),
                });
                setWeb3(web3Provider);
            })
            .catch((err : any)=>{
                console.log(err);
                console.log(err.code);
                if(err.code === -32002){
                    alert("Please connect to MetaMask");
                }
            })
        }else{
            alert("please install metamask extension");
        }
    },[]);

    return {
        user,
        web3
    };
};

export default useWeb3;