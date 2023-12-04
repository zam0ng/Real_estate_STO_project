// import axios from 'axios';
import axios from "../../../components/url";
import { useQuery } from "@tanstack/react-query";
import Dropdown from "./Dropdown";
import { SubAllList } from "../../../features/SubAllList";

export default function ProcessBox() {
  const fetchData = async () => {
    const { data } = await axios.get(`/subscription/all_list`);
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["SubAllList"],
    queryFn: fetchData,
  });

  if (isLoading) return <Dropdown props={"로딩중입니다.."} />;

  if (error) return <Dropdown props={"접속이 원활하지 않습니다.."} />;

  const start = data.filter(
    (building: SubAllList) => building.subscription_status === "start"
  );
  const pending = data.filter(
    (building: SubAllList) => building.subscription_status === "pending"
  );

  // console.log(start);
  // console.log(pending);

  return (
    <>
      <div className="w-5/6 m-auto   mt-5 ">
        <div className="text-xl font-bold">
          <span>진행중인 청약</span>
          <span className=" ml-3 ">{start.length == 0 ? 0 : start.length}</span>
        </div>
        {start.length !== 0 ? (
          <Dropdown props={start} />
        ) : (
          <div className="bg-[#EDF0F4] rounded-xl shadow-innerneu2 text-gray-300 font-bold  mt-2  h-16 text-center pt-5">
            진행중인 청약이 없어요
          </div>
        )}
      </div>
      <div className="w-5/6 m-auto  h-auto mt-5">
        <div className="text-xl font-bold shadow-2xl">
          <span>예정된 청약</span>
          <span className=" ml-3 ">
            {pending.length == 0 ? 0 : pending.length}
          </span>
        </div>
        {pending.length !== 0 ? (
          <Dropdown props={pending} />
        ) : (
          <div className="bg-[#EDF0F4] rounded-xl shadow-innerneu2 text-gray-300 font-bold   mt-2  h-16 text-center pt-5">
            멋진 건물을 준비하고 있어요
          </div>
        )}
      </div>
    </>
  );
}
