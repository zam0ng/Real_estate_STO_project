
import { InputFormItemProps, InputFormItemPropsTitle } from "@/app/_features/admin/dashboard";


const InputFormItemTitle:React.FC<InputFormItemPropsTitle> = ( {_title, _type , _name , _placeholder, _step} ) => {
 
  return (
    <>
      {/* 제목 */}
      <h2 className="mt-6 text-lg font-bold tracking-tighter w-40rem text-adminLayout_menubar_name">
        {_title}
      </h2>
      {/* input */}
      <div className="flex items-center justify-start h-12 mt-2 border-2 rounded-xl text-admin_modal_input font-semiSemibold border-admin_modal_border w-40rem">
        <textarea className="w-full pl-3 text-sm font-medium outline-none "  name={_name} placeholder= {`ex) ${_placeholder}`}/>
      </div>

    </>
  );
};

export default InputFormItemTitle;
