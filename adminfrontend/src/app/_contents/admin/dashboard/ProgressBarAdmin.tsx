type ProgressbarType = {
    percent : number;
}

export default function ProgressBarAdmin ({percent} : ProgressbarType) {

    return(
        <div className="h-2 m-3 mx-auto bg-gray-300 rounded-full ">
            <div 
                // className="h-2 bg-blue-500 rounded-full bg-gradient-to-r to-blue-300 from-blue-500" 
                className="h-2 bg-gray-900 rounded-full" 
                style={{width : `${percent}%`}}>
            </div>
        </div>
    )
}