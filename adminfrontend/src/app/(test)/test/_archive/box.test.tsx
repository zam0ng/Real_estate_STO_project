

import InfoIcon from "@/app/_components/_ui/InfoIcon";


export default function Test() {
  return (
    <>
      <div className="flex justify-center w-screen h-screen overflow-hidden bg-admin_modal_bg">
        
        <div className=" flex justify-center my-8 bg-white min-h-[80vh] rounded-2xl w-admin_modal ">

          {/* wrapper */}
          <div className="w-screen my-8 mx-7">

            <h1 className="text-2xl font-bold tracking-tighter text-adminLayout_menubar_name" > About your page </h1>

            <div className="mt-8 h-line bg-admin_modal_line" ></div>

            {/* 이게 쫙 옆으로 넓어지게 하고 싶은데 👇👇  */}
            {/* <div className="w-full h-32 mt-7 rounded-2xl bg-admin_modal_info pl-7 pr-14 py-2rem" >  

              <div className="flex w-full h-full bg-sky-100" > 

                <div>
                  <InfoIcon />
                </div>
                
                
                <div className="flex w-auto h-auto text-xs font-normal " >
                  <p className="w-auto h-auto" >Use this space to introduce yourself and give potential members an idea of what they can expect. </p>
                  <p className="w-auto h-auto" >More tips for your About page</p>                  
                </div>

                
              </div>
            
            </div> */}


            {/* 이게 쫙 옆으로 넓어지게 하고 싶은데 👇👇  */}
            <div className="flex items-center justify-center h-52 w-40rem mt-7 rounded-2xl bg-admin_modal_info " >  

              <div className="flex h-28 bg-pink-300 w-34.75rem " > 

                <div className="flex items-center">
                  {/* <InfoIcon /> */}
                  h
                </div>
                
                <div className="flex items-center text-xs font-light " >
                  <div>Use this space to introduce yourself and give potential members an idea of what they can expect. </div>
                  <div>More tips for your About page</div>                  
                </div>

                
              </div>
            
            </div>

            <div className="bg-gray-300 h-52 w-40rem rounded-2xl">
              
            </div>

            <div>
              
            </div>








            

          </div>

        </div>
      </div>
    </>
  );
}
