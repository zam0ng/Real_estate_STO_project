import { getVoteList } from "@/app/_utils/getVoteList";

import { CreateVoteBtn } from "@/app/_contents/admin/main/CreateVoteBtn";

import { RenderVotes } from "@/app/_contents/admin/main/RenderVotes";

interface Props {
    title?: string;
    description: string;
    id: number;
    author? : string;
}

interface RenderVotesProps {
    voteListData: Props[];
}

export default async function AdminMain() {
  const voteListData: Props[] = await getVoteList();
  console.log("voteListData" , voteListData)

  return (
    <>
      <h1> 어드민 페이지 </h1>

      {/* 투표 등록 */}
      <CreateVoteBtn />

      {/* 투표 관리 */}
      <RenderVotes voteListData={voteListData} />
    </>
  );
}
