
// const postFetchVoteInfoCATable = async (formData : FormData) => {
const postFetchVoteInfoCATable = async (tokenCA : string , realEstateName : string) => {

  // const caAddress = formData.get('caAddress'); // 'addressFieldName'은 해당 필드의 이름입니다.
  // const realEstateName = formData.get('real_estate_name');
  // const voteTitle = formData.get('voteTitleFieldName');
  // const voteStartDate = formData.get('voteStartDateFieldName');
  // const voteEndDate = formData.get('voteEndDateFieldName');

  const path = `/vote/insert_contract_address`;
  const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
  const url = `${domain}${path}`

  const postData = {
    real_estate_name: realEstateName,
    address: tokenCA
}
  // console.log("postData_postFetchVoteInfoCATable" , postData)


  try {    
    const response = await fetch(
      `${url}`,
      {
        method: "POST",
        headers : {
          // 'Content-Type' : 'multipart/form-data', // form 데이터 인 경우  
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
    
  }

  // const response = await fetch(
  //   "http://localhost:8080/admin/subscription_submit",
  //   {
  //     method: "POST",
  //     body: formData,
  //   }
  // );

  // if (response.status !== 201) {
  //   throw new Error(
  //     "Failed to fetch data : 매물 등록 후 서버에서 fetch 받기 Error"
  //   );
  // } else {
  //   return response;
  // }

};

export default postFetchVoteInfoCATable;


