import { TableTitleProps } from "@/app/_features/admin/main";


const TableTitle:React.FC<TableTitleProps> = ({title}) => {
  return (
    <>
      {/* table 제목 */}
      <div className=" bg-white items-center w-4/4	 mt-12 h-28 mx-44 text-1.75rem font-bold tracking-tight text-adminLayout_menubar_name flex rounded-t-3xl">
        <p className="ml-12 tracking-tight"> {title} </p>
      </div>
    </>
  );
};

export default TableTitle;
