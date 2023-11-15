const BtnCreate = () => {

  // <Link href={"/admin/dashboard"} > 임시❎ </Link> 
  
  return (
    <>
      <button className="  ml-3 flex items-center justify-center w-5.6rem h-10 rounded-1.25rem  bg-admin_modal_create">
        <p className="text-sm font-bold text-admin_modal_createText">
          {" "}
          Create{" "}
        </p>
      </button>
    </>
  );
};

export default BtnCreate;
