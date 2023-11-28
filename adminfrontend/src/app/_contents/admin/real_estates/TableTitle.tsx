import { TableTitleProps } from "@/app/_features/admin/main";


const TableTitle:React.FC<TableTitleProps> = ({title}) => {
  return (
    <>
      {/* table 제목 */}
      <div className="flex items-center mt-12 text-2xl font-semibold tracking-tight bg-white w-4/4 h-28 mx-44 text-adminLayout_menubar_name rounded-t-3xl">
        <p className="ml-12 tracking-tight"> {title} </p>
      </div>
    </>
  );
};

export default TableTitle;
