
export default function FullLoadingComponent(){
    return(
        <div className="w-screen  h-screen flex justify-center items-center">
            <img src={process.env.PUBLIC_URL + '/images/loadingGif/lego.gif'} className="w-20 h-20"></img>    
        </div>
    )
}