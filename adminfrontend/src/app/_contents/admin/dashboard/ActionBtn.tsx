import DashboardActionIcon from "./DashboardActionIcon";

const ActionBtn = () => {
  return (
    <>
      <div className="w-5.375rem h-5.375rem bg-dashboard_btn_estate  rounded-md flex items-center justify-evenly flex-col 	 ">
        <div className="w-6 h-6 ">
          {" "}
          <DashboardActionIcon />{" "}
        </div>
        <p className="text-base font-medium tracking-tight text-white">
          매물등록
        </p>
      </div>

      <div>

        
      </div>
      
    </>
  );
};

export default ActionBtn;
