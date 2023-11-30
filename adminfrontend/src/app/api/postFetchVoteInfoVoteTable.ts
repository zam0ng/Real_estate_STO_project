// interface postFetchVoteInfoVoteTableProps {}

const convertSecondsToDate = (seconds : any) => {
  const milliseconds = seconds * 1000;
  const date = new Date(milliseconds);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};


const postFetchVoteInfoVoteTable = async (formData : FormData) => {
  const caAddress = formData.get('caAddress'); 
  const realEstateName = formData.get('real_estate_name');
  const voteTitle = formData.get('notice_title');
  const _voteStartDate = formData.get('voteStartDate');
  const _voteEndDate = formData.get('voteEndDate');

  
    // 'YYYY-MM-DD' 형식으로 변환
    const voteStartDate = convertSecondsToDate(_voteStartDate);
    const voteEndDate = convertSecondsToDate(_voteEndDate);


  const path = `/vote/vote_insert`;
  const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
  const url = `${domain}${path}`
  
  const postData = {
    address: caAddress,
    real_estate_name: realEstateName,
    vote_title: voteTitle,
    vote_start_date: voteStartDate,
    vote_end_date: voteEndDate
  }
  
  console.log("postData_postFetchVoteInfoVoteTable", postData)

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


