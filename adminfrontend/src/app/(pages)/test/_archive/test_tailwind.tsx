export default function test() {
  return (
    <>
      {/*  기본 테스트 */}
      <h1 className="text-4xl font-bold text-center text-blue-500">
        tailwind 테스트
      </h1>

      {/* https://tailwindcss.com/docs/utility-first */}
      <div className="flex items-center max-w-sm p-6 mx-auto space-x-4 bg-white shadow-lg rounded-xl">
        <div className="shrink-0">
          <img className="w-12 h-12" src="/public/tomhardy.jpg" alt="hardy" />
        </div>
      </div>

      <div className="max-w-sm px-8 py-8 mx-auto space-y-2 bg-white shadow-lg rounded-xl-lg sm:py-4 sm:flex sm:items-center"></div>

      <div className="max-w-sm px-8 py-8 mx-auto space-y-2 bg-white shadow-lg rounded-xl sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
        <img
          className="block h-24 mx-auto rounded-full sm:mx-0 sm:shrink-0"
          src="/adminfrontend/img/erin-lindford.jpg"
          alt="Woman's Face"
        />
        <div className="space-y-2 text-center sm:text-left">
          <div className="space-y-0.5">
            <p className="text-lg font-semibold text-black">Erin Lindford</p>
            <p className="font-medium text-slate-500">Product Engineer</p>
          </div>
          <button className="px-4 py-1 text-sm font-semibold text-purple-600 border border-purple-200 rounded-full hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
            Message
          </button>
        </div>
      </div>



    {/* https://www.youtube.com/watch?v=UvF56fPGVt4&t=36s */}
    <div className="bg-gray-200" >

    </div>







    </>
  );
}
