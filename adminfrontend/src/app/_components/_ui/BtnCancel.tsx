import Link from "next/link"

const BtnCancel = () => {
  return (
    <>
        <Link href={"/admin/dashboard"} className="  flex items-center justify-center w-5.6rem h-10 rounded-1.25rem  bg-admin_modal_cancel" >
            <p className="text-sm font-bold text-admin_modal_cancelText" > Cancel </p>
        </Link>
    </>
  )
}

export default BtnCancel