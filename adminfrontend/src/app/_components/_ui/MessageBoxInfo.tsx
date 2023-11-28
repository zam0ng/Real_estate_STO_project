import InfoIcon from "./InfoIcon"


const MessageBoxInfo = () => {
  return (
    <>
            {/* info 안내 문구 */}
            <div className="flex items-center justify-center h-32 mt-7 w-40rem rounded-2xl bg-admin_modal_info ">
              {/* wrapper */}
              <div className="w-36.75rem h-32  flex items-center ">
                <div className="flex items-center justify-center w-14 h-14 ">
                  <InfoIcon />
                </div>

                {/* admin_modal_text */}
                <div className="flex flex-col items-center justify-center h-20 ml-5 w-31rem">
                  
                  <div className="text-base font-normal leading-5 w-31rem text-admin_modal_desc ">
                    Use this space to introduce yourself and give potential
                    members an idea of what they can expect.{" "}
                  </div>
                  <div className="mt-1 text-base font-bold tracking-tight w-31rem text-admin_modal_text">
                    More tips for your About page{" "}
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default MessageBoxInfo