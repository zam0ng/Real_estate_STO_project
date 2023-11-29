import React, { useEffect, useState, createContext } from "react";
import DealHeader from "../contents/deal/layout/DealHeader";
import DealMain from "../contents/deal/layout/DealMain";
import { io, Socket } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { serverurl } from "../components/serverurl";

const Deal: React.FC = () => {
  const [isSocket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    //소켓 연결 io.connect() 랑 동일
    const socket = io(`${serverurl}`);
    setSocket(socket);

    return () => {
      // console.log('disconnect');

      socket.disconnect();
    };
  }, []);

  return (
    <div className="deal w-screen h-screen overflow-hidden flex flex-col justify-center box-border">
      <div className="w-full h-full">
        <DealHeader isSocket={isSocket} />
        <DealMain isSocket={isSocket} />
      </div>
    </div>
  );
};

export default Deal;
