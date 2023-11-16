export default function Test() {
  return (
    <>
      <div className="flex justify-center w-screen h-screen overflow-hidden bg-admin_modal_bg">
        
        <div className=" flex justify-center my-8 bg-white min-h-[80vh] rounded-2xl w-admin_modal ">

          {/* wrapper */}
          <div className="w-screen my-8 mx-7">

            <h1 className="text-2xl font-bold text-adminLayout_menubar_name" > About your page </h1>

            <div className="mt-8 h-line bg-admin_modal_line" ></div>

            {/* 이게 쫙 옆으로 넓어지게 하고 싶은데 👇👇  */}
            <div className="h-32 " >  </div>

          </div>

        </div>
      </div>
    </>
  );
}
