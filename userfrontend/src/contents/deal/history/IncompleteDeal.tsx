import React from 'react';

const IncompleteDeal = () => {
    const completeList = [
        {
            order_type: "판매",
            createdAt: "2023-11-01 09:00",
            price: 4000,
            amount: 5
        },
        {
            order_type: "구매",
            createdAt: "2023-11-01 10:00",
            price: 4000,
            amount: 5
        },
        {
            order_type: "구매",
            createdAt: "2023-11-01 11:00",
            price: 4000,
            amount: 5
        },
        {
            order_type: "판매",
            createdAt: "2023-11-01 12:00",
            price: 4000,
            amount: 5
        }
    ];

    const fromRecent = completeList.sort((a,b)=>{
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB.getTime() - dateA.getTime();
    });
    console.log(fromRecent);

    return (
        <>
            {fromRecent.map((item,index)=>{
                return(
                    <div className='w-full h-[30%] flex flex-col items-center text-sm mt-2 mb-2' key={index}>
                        <div className={`w-[80%] h-1/5 flex justify-between ${item.order_type === "판매" ? "blueText" : "redText"}`}>
                            <div>{item.order_type}</div>
                            <button className='w-[30%] h-full bg-slate-400 text-xs text-white rounded-md flex justify-center items-center'>취소</button>
                        </div>
                        <div className='w-[80%] h-1/5 text-xs text-slate-400 flex items-center '>{item.createdAt}</div>
                        <div className='w-[80%] h-1/5 text-sm flex flex-row justify-between'>
                            <p>가격</p>
                            <div>{item.price} 원</div>
                        </div>
                        <div className='w-[80%] h-1/5 text-sm flex flex-row justify-between'>
                            <p>수량</p>
                            <div>{item.amount} 개</div>
                        </div>
                        <div className='w-[80%] h-1/5 text-sm flex flex-row justify-between'>
                            <p>금액</p>
                            <div>{item.price * item.amount} 원</div>
                        </div>
                    </div>
                )
            })}
        </>
    )
};

export default IncompleteDeal;