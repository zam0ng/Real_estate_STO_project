import axios from "../../../components/url";
import { useQuery } from "@tanstack/react-query";
import { SubAllList } from "../../../features/SubAllList";

type SubAllListType = {
  props: string;
};

export default function SubEndedList({ props }: SubAllListType) {
  const fetchData = async () => {
    const { data } = await axios.get(`/subscription/all_list`);
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["SubAllList"],
    queryFn: fetchData,
  });

  if (isLoading) return <>로딩중입니다 ..</>;

  if (error) return <>접속이 원활하지 않습니다..</>;

  // console.log(data);

  let newData = data;

  if (props != "all") {
    newData = data.filter(
      (building: SubAllList) => building.subscription_status === props
    );
  }



    return(

        <>
        
        {newData.map((building :SubAllList, index : number) => (

        <div key={index} className='border-b-2 mx-2 h-12 m-auto mt-1 flex justify-between'>
        <div className=" w-14 h-10 mr-2 mt-1 rounded-full" style={{background : `url('http://localhost:8080/estate_img/${building.subscription_img_1}')`, backgroundSize : 'cover'}}> </div>
        <div className=" h-14 w-32 flex flex-col text-left pt-1  ">
            <span className="text-xs">{building.subscription_name}</span>
            <span className="text-xs pt-1">현재가{building.start_price}</span>
          </div>
          <div className=" h-12 w-4/5 text-xxs  pt-2 flex-col  text-right whitespace-nowrap overflow-hidden ">
            <div>{building.subscription_description}</div>
            <div>
              {building.start_price != null
                ? <span>수익률  {(building.start_price - 5000) / 50 + "%"}</span>
                : "청약 목표 미달성"}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
