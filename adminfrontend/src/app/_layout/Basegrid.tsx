export default function Basegrid() {
return (
    <>
    <div className="grid h-screen overflow-hidden bg-yellow-200 grid-cols-layout " >

        <div className="col-span-2 h-36 bg-stone-300" > header </div>
        
        <div className="bg-green-300 min-h-[89vh] w-96"> 메뉴바 가이드 라인</div>
        <div className="bg-sky-100"> table container </div>
        
        {/* <div className="col-span-2 bg-blue-200 " > footer </div> */}

    </div>

    </>
);  
}
