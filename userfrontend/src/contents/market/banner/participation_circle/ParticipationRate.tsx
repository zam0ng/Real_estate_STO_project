import React, { useEffect, useState } from "react";

interface CompletionProps {
  completionRate: number | undefined;
}

const ParticipationRate: React.FC<CompletionProps> = ({ completionRate }) => {
  const [rate, setRate] = useState<string>("0");

  useEffect(() => {
    if (!completionRate) return;
    if (completionRate === 0) {
      setRate("0");
    } else {
      setRate((completionRate)!.toFixed(1));
    }
  }, [completionRate]);

  return (
    <>
      <div className="w-full h-2/5 text-xxs flex justify-center items-end z-10">
        청약 모집률
      </div>
      <div className="w-full h-3/5 text-lg flex justify-center items-start z-10">
        {rate}%
      </div>
    </>
  );
};

export default ParticipationRate;
