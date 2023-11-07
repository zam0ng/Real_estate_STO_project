"use client";


export const RenderVotes: React.FC = ({voteListData}) => {
  return (
    <>
      {voteListData.map(
        ({
          id,
          title,
          description,
        }: {
          id: number;
          title: string;
          description: string;
        }) => {
          if (id != null) {
            return (
              <div key={id}>
                <p> 투표 매물 id : {id} </p>
                <p> 투표 제목 : {title} </p>
                <p> 투표 설명 : {description} </p>

                <br></br>
                <br></br>
                <br></br>
              </div>
            );
          }
        }
      )}
    </>
  );
};
