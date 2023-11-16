import InfoIcon from "@/app/_components/_ui/InfoIcon";
import FormItem from "@/app/_components/_ui/GetInputData";

import BtnCancel from "@/app/_components/_ui/BtnCancel";
import BtnCreate from "@/app/_components/_ui/BtnCreate";
import MessageBoxInfo from "@/app/_components/_ui/MessageBoxInfo";

export default function Test() {
  return (
    <>
      {/* 끝나고 px 수정!  */}

      <div className="flex justify-center w-screen h-screen overflow-hidden bg-admin_modal_bg">
        <div className="flex justify-center my-8 bg-admin_modal_mainBG rounded-lg  w-admin_modal h-71.5rem overflow-y-auto  overflow-x-hidden modal-custom-scrollbar">
          {/* wrapper */}
          <div className="my-8 w-40rem mx-7 h-37.9rem ">
            {/* 제목 : About your page */}
            <h1 className="text-3xl font-bold tracking-tighter text-center w-40rem text-adminLayout_menubar_name">
              About your page
            </h1>

            {/* 구분선 */}
            <div className="mt-8 h-line bg-admin_modal_line"></div>

            {/* info 안내 문구 */}
            <MessageBoxInfo />

            <FormItem />
            <FormItem />
            <FormItem />
            <FormItem />
            <FormItem />
            <FormItem />
            <FormItem />

            {/* 작성완료 및 취소 버튼 */}
            <div className="flex items-center justify-end h-28 ">
              <BtnCancel />

              <BtnCreate />
            </div>

            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
