interface postFetchEstateFormProps {}



const postFetchEstateForm = async (formData : FormData) => {
  console.log("실행됨?");
  const path = `/admin/subscription_submit`;
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
    
    if (response.status !== 201) {
      throw new Error(
        "Failed to fetch data : 매물 등록 후 서버에서 fetch 받기 Error"
      );
    } else {
      return response;
    }
  } catch (error) {
    console.log(error)
  }

};

export default postFetchEstateForm;
