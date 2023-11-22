import {
  getVoteList,
  getSubscriptionsList,
  getBlackList,
  getNoticesList,
} from "@/app/_api";

import { SearchParamsProps } from "@/app/_features/admin/dashboard";

// import ModalFormRealestate from "@/app/_contents/admin/dashboard/_archive/ModalFormRealestate";
import DashboardView from "@/app/_contents/admin/dashboard/DashboardView";
import FormEstate from "@/app/_contents/admin/dashboard/FormEstate";
import FormEstateTest from "@/app/_contents/admin/dashboard/_archive/FormEstateTest";

import {
  CreateVoteBtn,
  CreateEstateBtn,
  CreateBlackListBtn,
  CreateNoticeBtn,
  RenderBlackList,
  RenderVotes,
  RenderSubscriptions,
  RenderNotices,
} from "@/app/_contents/admin/main";

import {
  VoteProps,
  SubscriptionData,
  BlackListData,
  NoticesListData,
} from "@/app/_features/admin/main";

export default async function Dashboard( { searchParams }: SearchParamsProps) {
  // const voteListData: VoteProps[] = await getVoteList();
  // console.log("voteListData", voteListData);

  // const subscriptionData: SubscriptionData[] = await getSubscriptionsList();
  // console.log("subscriptionData", subscriptionData); // ⭐⭐서버 컴포넌트니까, 터미널에 찍힘

  // const blacklistData: BlackListData[] = await getBlackList();
  // console.log("blacklistData", blacklistData); // ⭐⭐서버 컴포넌트니까, 터미널에 찍힘

  // const noticesListData: NoticesListData[] = await getNoticesList();
  // console.log("noticesListData", noticesListData);

  const isEstateModalOpen = searchParams?.estateModal;
  // const isEstateTestModalOpen = searchParams?.estateTestModal;

  return (
    <>
      {/* <h1> 어드민 대시보드   </h1> */}

      {/* 게시글 등록 */}
      {/* <CreateNoticeBtn /> */}

      {/* 공시(공지) 게시글 등록 */}
      {/* <RenderNotices noticesListData={noticesListData} /> */}

      {/* 블랙 리스트 등록 */}
      {/* <CreateBlackListBtn /> */}
      {/* 블랙리스트 관리 */}
      {/* <RenderBlackList blacklistData={blacklistData} /> */}

      {/* 매물 등록 */}
      {/* <CreateEstateBtn  /> */}

      {/* 매물 등록 팝업 */}
      {/* {isEstateModalOpen && <ModalFormRealestate />} */}
      {isEstateModalOpen && <FormEstate />}
      {/* {isEstateTestModalOpen && <FormEstateTest />} */}

      {/* 매물 등록한 것 보여주기 */}
      {/* <RenderSubscriptions subscriptionData={subscriptionData} /> */}

      {/* 투표 등록 */}
      {/* <CreateVoteBtn /> */}
      {/* 투표 등록한거 보여주기 */}
      {/* <RenderVotes voteListData={voteListData} /> */}

      <DashboardView />
    </>
  );
}