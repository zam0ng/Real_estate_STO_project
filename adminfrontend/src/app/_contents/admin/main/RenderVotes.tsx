"use client";

import { RenderVotesProps } from "@/app/_features/admin/main";

export const RenderVotes: React.FC<RenderVotesProps> = ({ voteListData }) => {
  return (
    <>
      {voteListData.map((item) => {
        if (item.id != null) {
          return (
            <div key={item.id}>
              <p> 투표 id : {item.id} </p>
              <p> 투표 제목 : {item.title} </p>
              <p> 투표 설명 : {item.description} </p>

              <br></br>
              <br></br>
              <br></br>
            </div>
          );
        }
      })}
    </>
  );
};
