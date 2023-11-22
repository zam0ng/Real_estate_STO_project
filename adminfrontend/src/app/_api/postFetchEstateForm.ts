interface postFetchEstateFormProps {}

const postFetchEstateForm = async (formData : FormData) => {
  const response = await fetch(
    "http://localhost:8080/admin/subscription_submit",
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
};

export default postFetchEstateForm;
