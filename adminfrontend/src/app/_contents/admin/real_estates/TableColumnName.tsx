
import { TableColumnNameProps } from "@/app/_features/admin/real_estates";

  const TableColumnName = ({columnName} : TableColumnNameProps) => {
  return (
    <>
      <div className="flex items-center justify-center h-12 col-span-1 font-semibold text-table_crieria_text ">
        <div className="">
        {columnName}
        </div>
      </div>
    </>
  );
};

export default TableColumnName;
