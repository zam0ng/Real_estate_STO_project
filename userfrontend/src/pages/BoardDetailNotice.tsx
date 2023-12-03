import React from "react";
import BoardDetailHeader from "../contents/board_detail/BoardDetailHeader";
import BoardDetailTitleBox from "../contents/board_detail/BoardDetailTitleBox";
import BoardDetailBody from "../contents/board_detail/BoardDetailBody";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { serverurl } from "../components/serverurl";
import LoadingComponent from "../components/LoadingComponent";
export interface BoardDetailContentRequest {
  category: string;
  notice_title: string;
  notice_content: string;
  createdAt: string;
}

const BoardDetailNotice: React.FC = () => {
  const currentPage = useLocation();
  // console.log(currentPage.state);

  const fetchDetailContent = async (): Promise<BoardDetailContentRequest> => {
    const { data } = await axios.get(
      `${serverurl}/market/detail/board_detail/${currentPage.state.id}`
    );
    return data;
  };

  const { data, error, isLoading, isError } =
    useQuery<BoardDetailContentRequest>({
      queryKey: ["boardDetailFetch", currentPage.state.id],
      queryFn: fetchDetailContent,
    });

  if (isLoading) {
    return(
      <LoadingComponent/>
  );
  }

  if (isError) {
    return <div>Error: cannot fetch data</div>;
  }

  return (
    <div className="w-screen h-screen">
      <BoardDetailHeader category={data?.category} />
      <BoardDetailTitleBox
        notice_title={data?.notice_title}
        createdAt={data?.createdAt}
        real_estate_name={currentPage.state.real_estate_name}
      />
      <BoardDetailBody notice_content={data?.notice_content} />
    </div>
  );
};

export default BoardDetailNotice;
