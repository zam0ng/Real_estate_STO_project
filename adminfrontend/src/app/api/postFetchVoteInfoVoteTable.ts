// interface postFetchVoteInfoVoteTableProps {}

// import { DataFormParams, dataFormParams, dataFromFormParams } from "../_features/admin/dashboard";



const convertSecondsToDate = (seconds : any) => {
  const milliseconds = seconds * 1000;
  const date = new Date(milliseconds);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};


interface DataFormParams {
  realEstateName: string;
  voteTitle: string;
  voteStartDate: string;
  voteEndDate: string;
}

// const postFetchVoteInfoVoteTable = async (dataForm  : DataFormParams , tokenCA : string) => {
const postFetchVoteInfoVoteTable = async (realEstateName : string, voteTitle : string, voteStartDate : string, voteEndDate : string, tokenCA : string) => {
  // const caAddress = formData.get('caAddress'); 

  // const { realEstateName, voteTitle, voteStartDate, voteEndDate } = dataForm;

  // const tempvoteStartDate = voteStartDate
  // const tempvoteEndDate = voteEndDate

  const caAddress = tokenCA; 

  // const realEstateName = formData.get('real_estate_name') as string | null;
  // const voteTitle = formData.get('notice_title') as string | null;
  // const _voteStartDate = formData.get('voteStartDate')
  // const _voteEndDate = formData.get('voteEndDate');

  console.log("postFetchVoteInfoVoteTable")
  console.log(caAddress , 
    realEstateName ,
    voteTitle, 
    voteStartDate, 
    voteEndDate, 
    )
  
    // 'YYYY-MM-DD' 형식으로 변환
    const convertVoteStartDate = convertSecondsToDate(voteStartDate);
    const convertVoteEndDate = convertSecondsToDate(voteEndDate);


  const path = `/vote/vote_insert`;
  const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
  const url = `${domain}${path}`
  
  const postData = {
    address: caAddress,
    real_estate_name: realEstateName,
    vote_title: voteTitle,
    vote_start_date: convertVoteStartDate,
    vote_end_date: convertVoteEndDate
  }
  
  // console.log("postData_postFetchVoteInfoVoteTable", postData)

  try {
    const response = await fetch(
      `${url}`,
      {
        method: "POST",
        headers : {
          // 'Content-Type' : 'multipart/form-data', // form 데이터 인 경우 -> 백엔드에서는 req.file 로 받음
          'Content-Type' : 'application/json', // json 인 경우 -> 백엔드에서는 req.body 로 받음
        },
        body: JSON.stringify(postData),
      }
    );
    
    // ✅ response.status 백엔드에서 201 로 오는지 확인
    if (response.status == 201 || response.ok) {
      return response.json
    } 

  } catch (error) {
    console.log(error)
  }

  // try {
  //   const response = await fetch(
  //     "http://localhost:8080/admin/subscription_submit",
  //     {
  //       method: "POST",
  //       body: formData,
  //     }
  //   );
    
  //   // ✅ response.status 백엔드에서 201 로 오는지 확인
  //   if (response.status == 201) {
  //     return response
  //   } 

  // } catch (error) {
  //   console.log(error)
  // }

};

export default postFetchVoteInfoVoteTable;


