
const postFetchNoticeForm = async (formData : FormData) => {

  const path = `/admin/notice_submit`;
  const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
  const url = `${domain}${path}`

  // for (let [key, value] of formData.entries()) {
  //   console.log("formData 확인 @postFetchNoticeForm 🐣🐣");
  //   console.log(`${key}: ${value}`);
  // }

  // formData 를 json 으로 변환
  let object: { [key: string]: FormDataEntryValue } = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  const jsonBody = JSON.stringify(object);


  try {
    const response = await fetch(
      `${url}`,
      {
        method: "POST",
        headers : {
          'Content-Type' : 'application/json',
        },
        body: jsonBody,
      }
    );

    if(response.ok){
      const contentType = response.headers.get('Content-Type');   
      
      if (contentType && contentType.includes('application/json')) {    // 서버 응답이 'application/json' 인 경우
        return response.json();
      } 
      
      if (contentType && contentType.includes('text/plain')) {    // 서버 응답이 'text/plain' 인 경우
        return response.text();
      }  
    }
    
    
  } catch (error) {
    console.log(error)
  }

};

export default postFetchNoticeForm;
