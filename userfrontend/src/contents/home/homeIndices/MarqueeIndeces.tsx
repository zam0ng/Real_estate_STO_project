
export default function MarqueeIndeces (){
    return(
        <div className="relative flex overflow-hidden">
            <div className="flex whitespace-nowrap flex-nowrap animate-marquee">
                <div className="w-32 h-40 rounded-2xl mx-2  border border-black flex-shrink-0">1</div>
                <div className="w-32 h-40 rounded-2xl mx-2  border border-black flex-shrink-0">2</div>
                <div className="w-32 h-40 rounded-2xl mx-2  border border-black flex-shrink-0">3</div>
                <div className="w-32 h-40 rounded-2xl mx-2  border border-black flex-shrink-0">4</div>
                <div className="w-32 h-40 rounded-2xl mx-2  border border-black flex-shrink-0">5</div>
            </div>

            <div className="absolute flex whitespace-nowrap flex-nowrap animate-marquee2">
                <div className="w-32 h-40 rounded-2xl mx-2  border border-black flex-shrink-0">1</div>
                <div className="w-32 h-40 rounded-2xl mx-2  border border-black flex-shrink-0">2</div>
                <div className="w-32 h-40 rounded-2xl mx-2  border border-black flex-shrink-0">3</div>
                <div className="w-32 h-40 rounded-2xl mx-2  border border-black flex-shrink-0">4</div>
                <div className="w-32 h-40 rounded-2xl mx-2  border border-black flex-shrink-0">5</div>
            </div>

        </div>
    )
}