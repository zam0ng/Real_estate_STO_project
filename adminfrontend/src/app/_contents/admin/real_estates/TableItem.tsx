import ImageName from "./ImageName";
import CurrentResult from "./CurrentResult";
import Status from "./Status";
import Progress from "./Progress";
import Totalprice from "./Totalprice";
import Duration from "./Duration";
import ResultDate from "./ResultDate";
import Description from "./Description";
import ActionButton from "./ActionButton";

const TableItem = () => {
return (
    <>
    {/* 두 번째 행 : item*/}
    {/* 구분선 */}
    <div className="w-full col-span-9 border-t-2 border-collapse border-neutral-100 ">
    </div>

    <ImageName />

    <Description />
    
    <Status />

    <Progress />

    <Totalprice />

    <CurrentResult />

    <Duration />

    <ResultDate />


    <ActionButton />
    </>
);
};

export default TableItem;
