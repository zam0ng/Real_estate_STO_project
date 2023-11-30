import { useEffect } from "react";
import React from "react";

declare global {
    interface Window {
      kakao: any;
    }
}

interface MapProps {
    addressKor: string;
    width: string;
    height: string;
}




const KakaoMap: React.FC<MapProps> = ({addressKor,width,height}) => {


    useEffect(()=>{
        window.kakao.maps?.load(()=>{

            let mapContainer = document.getElementById('map');
            let mapOption = {
                center : new window.kakao.maps.LatLng(33.450701, 126.570667),
                level : 5
            };
            let geocoder = new window.kakao.maps.services.Geocoder();
            
            geocoder.addressSearch(addressKor,function(result : any,status : any){
                if(status === window.kakao.maps?.services.Status.OK) {
                    let coords = new window.kakao.maps.LatLng(result[0].y,result[0].x);
                    map.setCenter(coords);
                    
                    let marker = new window.kakao.maps.Marker({
                        position : coords
                    })

                    marker.setMap(map);
                }
            })
            let map = new window.kakao.maps.Map(mapContainer,mapOption);



            
            let mapTypeControl = new window.kakao.maps.MapTypeControl();
            // let zoomControl = new window.kakao.maps.ZoomControl();
            
            map.addControl(mapTypeControl,window.kakao.maps?.ControlPosition.TOPRIGHT);
            // map.addControl(zoomControl,window.kakao.maps.ControlPosition.RIGHT);
            
        })

    },[])


    return(
        <div id="map" className={`${width} ${height} bg-[#EDF0F4] rounded-xl shadow-neu2`}>
            
        </div>
    )
}

export default KakaoMap;