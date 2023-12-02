import {
  getVoteList,
  getSubscriptionsList,
  getBlackList,
  getNoticesList,
} from "@/app/api";

import { SearchParamsProps } from "@/app/_features/admin/dashboard";

import DashboardView from "@/app/_contents/admin/dashboard/DashboardView";
import FormEstate from "@/app/_contents/admin/dashboard/FormEstate";

import FormVote from "@/app/_contents/admin/dashboard/FormVote";
import FormNotice from "@/app/_contents/admin/dashboard/FormNotice";
import Formdividends from "@/app/_contents/admin/dashboard/FormDividends";
import getVoteableEstateData from "@/app/api/getVoteableEstateData";



export default async function Dashboard({ searchParams }: SearchParamsProps) {

  const voteableEstateData = await getVoteableEstateData(); // 투표 대상이 되는 전체 매물
  console.log("voteableEstateData" , voteableEstateData)


  const isEstateModalOpen = searchParams?.estateModal;
  const isVoteModalOpen = searchParams?.voteModal;
  const isNoticeModalOpen = searchParams?.noticeModal;
  const isDividendsModalOpen = searchParams?.dividendsModal;


  return (
    <>
      <div className="z-30">
        {isEstateModalOpen && <FormEstate />}

        {isVoteModalOpen && voteableEstateData && (
          <FormVote voteableEstateData={voteableEstateData} />
          )}

        {isNoticeModalOpen &&  voteableEstateData && (
          <FormNotice voteableEstateData={voteableEstateData} />
        ) }

        {isDividendsModalOpen &&  voteableEstateData &&  (
          <Formdividends voteableEstateData={voteableEstateData}  />
          ) }

        <DashboardView searchParams={searchParams} />
      </div>
    </>
  );
}
