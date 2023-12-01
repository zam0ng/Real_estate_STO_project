
export default function LoadingComponent(){
    return(
        <div className="w-full h-20 flex justify-center items-center">
            <img src={process.env.PUBLIC_URL + '/images/loadingGif/lego.gif'} className="w-12 h-12"></img>    
        </div>
    )
}