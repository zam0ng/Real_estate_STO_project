
const postFetchNoticeForm = async (formData : FormData) => {

  const path = `/admin/notice_submit`;
  const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
  const url = `${domain}${path}`

  try {
    const response = await fetch(
      `${url}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if(response.ok){
      return response.json()
    }
    
  } catch (error) {
    console.log(error)
  }

};

export default postFetchNoticeForm;
