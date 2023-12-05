import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import BoardItem from "./BoardItem";
import axios from "axios";
import LoadingComponent from "../../components/LoadingComponent";
import { serverurl } from "../../components/serverurl";

interface boardRequest {
  id: number;
  category: string;
  notice_title: string;
  createdAt: string;
  real_estate_name: string;
}

const BoardItemBox: React.FC = () => {
  const currentPage = useLocation();
  const propertyName = currentPage.state.propertyName;

  const boardFetch = async (): Promise<boardRequest[]> => {
    const { data } = await axios.get(
      `${serverurl}/market/detail/board/${propertyName}`
    );
    // // console.log(data);
    return data;
  };

  const { data, error, isLoading, isError } = useQuery<boardRequest[]>({
    queryKey: ["boardFetch", propertyName],
    queryFn: boardFetch,
  });

  useEffect(() => {
    console.log(data);
  },[data]);

  if(isLoading){
    return (
      <LoadingComponent />
    )
  }

  return (
    <div className="w-[90%] h-[90%] flex flex-col overflow-y-scroll">
      {data?.map((item, index) => (
        <BoardItem
          key={index}
          category={item.category}
          createdAt={item.createdAt}
          id={item.id}
          notice_title={item.notice_title}
          real_estate_name={item.real_estate_name}
        />
      ))}
    </div>
  );
};

export default BoardItemBox;
