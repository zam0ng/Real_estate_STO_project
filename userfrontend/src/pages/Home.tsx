import TabBar from "../layouts/TabBar";

export default function Home() {
  return (
    <>
      <div>홈 화면</div>

    <div className="w-5/6 m-auto relative  border border-black h-32">
      <div className=" right-0 w-52 py-2 text-white bg-blue-500 rounded-lg font-bold text-center text-xs ">
        <span className="block ">Bouns 지갑은 1분이면 충분해요!</span>
        <div className="absolute top-6 left-24 -mr-2 w-3 h-3 bg-blue-500 transform rotate-45"></div>
      </div>
      <div className=" top-4 left-5 border w-5/6 h-16 rounded-2xl m-auto"></div>
    </div>
      <TabBar />
    </>
  );
}
