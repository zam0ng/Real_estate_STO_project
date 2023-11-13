export default async function AdminMain(props) {
  const CreateEstateBtn = () => {
    const handleEstateBtn = () => {
      console.log("매물 등록 버튼 클릭");
    };

    return (
      <>
        <p>
          <button onClick={handleEstateBtn}> 매물 등록 </button>
        </p>
      </>
    );
  };
  return (
    <>
      <h3> 어드민 main 페이지 입니다. </h3>

      <p> 여기에, 이제, 날씨 api 같은걸 가져와서, 어떻게 보여지는지를 보자 </p>

      <CreateEstateBtn />
    </>
  );
}
