import { RenderItemProps } from "@/app/_features/admin/dashboard";

const RenderItem: React.FC<RenderItemProps> = ({ title , desc}) => {
  return (
    <>
      {/* 제목 */}
      <h2 className="mt-6 text-lg font-bold tracking-tighter w-40rem text-adminLayout_menubar_name">
        {title}
      </h2>
      {/* input */}
      {/* <div className="flex items-center justify-start h-12 mt-2 border-2 rounded-xl text-admin_modal_input font-semiSemibold border-admin_modal_border w-40rem"> */}
      <div className="flex items-center justify-start h-10 mt-1 font-medium bg-stone-100 text-adminLayout_menubar_name border-admin_modal_border w-40rem">
        {/* <input className="w-full pl-3 text-sm font-medium outline-none " type={_type} name={_name} placeholder= {`ex) ${_placeholder}`} step = {_step}/> */}
        <div className="ml-2"> {desc} </div>
      </div>
    </>
  );
};

export default RenderItem;
