type ProgressbarType = {
    percent : number;
}

export default function ProgressBar ({percent} : ProgressbarType) {
    return(
        <div className=" bg-gray-300 rounded-full h-2 mx-auto m-3 animate-pulse ">
            <div className="bg-blue-500 h-2 rounded-full  bg-gradient-to-r to-blue-700 from-purple-200" style={{width : `${Math.min(percent,100)}%`}}></div>
        </div>
    )
}