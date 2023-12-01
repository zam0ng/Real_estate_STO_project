
export default function ErrorComponent(){
    return(
        <div className="w-full h-20 flex justify-center items-center">
        <img src={process.env.PUBLIC_URL + '/images/error/F5image.png'} className="w-24 h-24"></img>
        <span className="font-extrabold text-xl text-gray-300 ">새로고침 F5</span> 
        </div>
    )
}