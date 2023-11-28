import { ActionButton } from "@/app/_features/admin/real_estates";

const ActionButton = ({ text }: ActionButton) => {
  return (
    <>
      {/* STO 등록 또는 청약 등록 */}
      <div   className="flex items-center justify-center col-span-1 text-base font-medium tracking-tight text-neutral-700 ">
        <div className="flex items-center justify-center w-24 h-8 -mr-8 border-2 rounded-lg border-text-action_btn_text bg-neutral-50">
          <p className="text-sm text-action_btn_text">{text}</p>
        </div>
      </div>
    </>
  );
};

export default ActionButton;
