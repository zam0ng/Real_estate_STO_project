const CardSmallNum = () => {
  return (
    <>
      <div className="flex items-center justify-between h-14 w-30rem ">
        <div className="flex items-center justify-center w-14 h-14 bg-slate-200 rounded-xl ">
          
          매물
        </div>

        <div className="flex flex-col mr-28 ">
          <p className="text-lg font-semibold text-dashboard_card_transaction_title">
            
            문래공차
          </p>
          <p className="text-sm font-medium text-dashboard_card_transaction_date">
            
            May 23,2022 at 8:20 PM
          </p>
        </div>

        <p className="text-2xl font-medium tracking-tight text-dashboard_card_transaction_title">
          
          +$32.50
        </p>
      </div>
    </>
  );
};

export default CardSmallNum;
