import React from "react";
import TransactionItem from "./TransactionItem";
import getTransaction from "@/app/api/getTransaction";
import Link from "next/link";
import { ITransactionData } from "@/app/_features/admin/dashboard";


const Transaction = async () => {
  const transactionData: ITransactionData = await getTransaction();
  // console.log("transactionData💎", transactionData);

  return (
    <>
      <div className="flex flex-col justify-around w-30rem h-60">
        {/* 제목 */}
        <div className="flex justify-between border-b-2 w-30rem">
          <h3 className="mb-4 text-xl font-bold">Latest transaction</h3>
          <Link
            href={"/admin/transactions"}
            className="flex items-center text-sm font-normal text-dashboard_card_transaction_view"
          >
            View all
          </Link>
        </div>

        {/* 구분선 */}
        {/* <div className="w-full border-2 border-borderLine " /> */}

        <div className="mt-4">
            {transactionData && transactionData
              .slice(0, 3)
              .map((item: ITransactionData, index: number) => {
                // console.log("item.subscription_img_1🚀🚀", item.subscription_img_1);
                return (
                  item &&
                  item.subscription_img_1 && (
                    <TransactionItem
                      key={index}
                      estateName={item.real_estate_name}
                      tradePrice={item.trade_price}
                      createdAt={item.createdAt}
                      imageURL={item.subscription_img_1}
                    />
                  )
                );
              })}
        </div>

          
      </div>
    </>
  );
};

export default Transaction;
