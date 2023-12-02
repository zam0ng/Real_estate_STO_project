import ImageName from "./ImageName";
import CurrentResult from "./CurrentResult";
import Status from "./StatusSuccess";
import Progress from "./Progress";
import Totalprice from "./Totalprice";
import Duration from "./Duration";
import ResultDate from "./ResultDate";
import Description from "./Description";
import ActionButton from "./ActionButton";

import { TableRow, UserTableRow } from "@/app/_features/admin/real_estates";
import Link from "next/link";
import EnableButton from "./EnableButton";
import DisableButton from "./DisableButton";
import EnrollBlacklistButton from "./EnrollBlacklistButton";
import BlacklistStatus from "./BlacklistStatus";
import CreatedDate from "./CreatedDate";
import ImageEmail from "./ImageEmail";
import Balance from "./Balance";
import TransactionStatus from "./UserStatus_";
import UserStatus from "./TransactionStatus_";
import UserStatus_ from "./UserStatus_";
import UnEnrollBlacklistButton from "./UnEnrollBlacklistButton";

const TableRowUser = async ({ item }: UserTableRow) => {
  const slicedAddress = item.wallet.slice(0, 15) + "...";

  const slicedCreatedAt = item.createdAt.split("T")[0];
  const slicedUpdatedAt = item.updatedAt.split("T")[0];

  const userBlackStatus = item.blacklist;

  return (
    <>
      {/* 구분선 */}
      <div className="w-full col-span-9 border-t-2 border-collapse border-neutral-100 ">
        {" "}
      </div>

      <ImageEmail
        id={item.id}
        imageURL={item.user_profile_img}
        name={item.user_email}
      />

      <Description id={item.id} desc={slicedAddress} />

      {/* <Balance id={item.id} balance={item.balance} /> */}

      <UserStatus_ id={item.id} status={item.blacklist} />

      {/* <Progress 
        id={item.id}
    progress={item.balance} /> */}

      <Balance id={item.id} balance={item.using_balance} />

      <Balance id={item.id} balance={item.using_balance} />

      <CreatedDate id={item.id} resultDate={slicedCreatedAt} />

      <CreatedDate id={item.id} resultDate={slicedUpdatedAt} />

      {/* <UserStatus_ id={item.id} status={item.blacklist}/> */}
      {userBlackStatus == true ? (
        <UnEnrollBlacklistButton text={"해제"} user_email={item.user_email} />
      ) : (
        <EnrollBlacklistButton text={"등록"} user_email={item.user_email} />
      )}
    </>
  );
};

export default TableRowUser;
