
export default function LoadingComponent(){
    return(
        <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center">
            
            <div><img src={process.env.PUBLIC_URL + '/images/loadingGif/lego.gif'} className="w-12 h-12"></img></div>
        </div>
    )
}
