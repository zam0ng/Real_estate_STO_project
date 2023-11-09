type ProgressbarType = {
    percent : number;
}

export default function ProgressBar ({percent} : ProgressbarType) {
    return(
        <div className="w-5/6 bg-gray-300 rounded-full h-2 mx-auto m-5 animate-pulse ">
            <div className="bg-blue-500 h-2 rounded-full text-center bg-gradient-to-r to-blue-600 from-purple-200" style={{width : `${percent}%`}}></div>
        </div>
    )
}