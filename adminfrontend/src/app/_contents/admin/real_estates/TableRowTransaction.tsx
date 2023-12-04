import ImageName from "./ImageName";
import CurrentResult from "./CurrentResult";
import Status from "./StatusSuccess";
import Progress from "./Progress";
import Totalprice from "./Totalprice";
import Duration from "./Duration";
import ResultDate from "./ResultDate";
import Description from "./Description";
import ActionButton from "./ActionButton";

import {
  TableRow,
  TransactionTableRow,
  UserTableRow,
} from "@/app/_features/admin/real_estates";
import Link from "next/link";
import EnableButton from "./EnableButton";
import DisableButton from "./DisableButton";
import EnrollBlacklistButton from "./EnrollBlacklistButton";
import BlacklistStatus from "./BlacklistStatus";
import CreatedDate from "./CreatedDate";
import ImageEmail from "./ImageEmail";
import Balance from "./Balance";
import TransactionStatus from "./UserStatus_";
import UserDescription from "./UserDescription";
import UserStatus from "./TransactionStatus_";
import TransactionDescription from "./TransactionDescription";
import TransactionStatus_ from "./TransactionStatus_";
import TransactionCreatedDate from "./TransactionCreatedDate";

const TableRowTransaction = async ({ item }: TransactionTableRow) => {
  // console.log(item);
  return (
    <>
      {/* 구분선 */}
      <div className="w-full col-span-9 border-t-2 border-collapse border-neutral-100 ">
        {" "}
      </div>

      {/*  */}
      <TransactionDescription id={item.id} desc={item.id} />

      <TransactionDescription id={item.id} desc={item.tx_symbol} />

      <TransactionDescription id={item.id} desc={item.tx_from} />

      <TransactionDescription id={item.id} desc={item.tx_to} />

      <TransactionDescription id={item.id} desc={item.tx_value} />

      <TransactionDescription id={item.id} desc={item.block_num} />

      <TransactionCreatedDate id={item.id} resultDate={item.createdAt} />

      <TransactionStatus_ id={item.id} status={item.transmission} />
    </>
  );
};

export default TableRowTransaction;
