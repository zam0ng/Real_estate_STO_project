


const FormItem = () => {
  return (
    <>
            {/* item container */}
            <div className="mt-20 ">
              {/* 제목 : 건물정보 */}
              <h1 className="text-2xl font-extrabold tracking-tighter w-40rem text-adminLayout_menubar_name">
                건물 정보
              </h1>
              
              {/* 설명 */}
                <div className="flex items-center justify-start h-12 -mt-1 text-admin_modal_input font-semiSemibold w-40rem">
                    <p className="" >건물 정보 상세 설명</p>
                </div>


              {/* item */}
                {/* 제목 */}
                <h2 className="mt-2 text-lg font-bold tracking-tighter w-40rem text-adminLayout_menubar_name">
                  Intro video
                </h2>
                {/* input */}
                <div className="flex items-center justify-start h-12 mt-2 border-2 rounded-xl text-admin_modal_input font-semiSemibold border-admin_modal_border w-40rem">
                    <p className="ml-4" >Video URL</p>
                </div>
              
              {/* item */}
                {/* 제목 */}
                <h2 className="mt-5 text-lg font-bold tracking-tighter w-40rem text-adminLayout_menubar_name">
                  Price
                </h2>
                {/* input */}
                <div className="flex items-center justify-start h-12 mt-2 border-2 text-admin_modal_input font-semiSemibold border-admin_modal_border rounded-xl w-40rem">
                    <p className="ml-4" >$ 0</p>
                </div>

              {/* item */}
                {/* 제목 */}
                <h2 className="mt-5 text-lg font-bold tracking-tighter w-40rem text-adminLayout_menubar_name">
                  Describe
                </h2>
                {/* input */}
                <div className="flex items-center justify-start h-12 mt-2 border-2 text-admin_modal_input font-semiSemibold border-admin_modal_border rounded-xl w-40rem">
                    <p className="ml-4" >Describe</p>
                </div>




            </div>


    </>
  )
}

export default FormItem