import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import web3 from "web3";
import axios from "axios";
import {Cookies} from "react-cookie"
import TabBar from "../layouts/tabBar";




export default function useCookie(urlProps : string){

    const [LoginCheck,setLoginCheck] = useState(false);  
    const [bounsURI,setBounsURI] = useState("");  
    const [iframeVisible, setIframeVisible] = useState(false);

    const cookies = new Cookies();

      useEffect(()=>{
        
        const isCookie =cookies.get('accessToken');
        if(isCookie){
          setLoginCheck(true);
        }else{

          let parsedUrl = new URL(window.location.href);
          const accessToken = parsedUrl.searchParams.get("access_token");
          const refreshToken = parsedUrl.searchParams.get("refresh_token");
    
          if (typeof accessToken == 'string' && typeof refreshToken == 'string') {

            cookies.set('accessToken' ,accessToken,{maxAge : 60 * 60 * 2, path : "/"})
            cookies.set('refreshToken' ,refreshToken,{maxAge : 60 * 60 * 3, path : "/"})
            // 쿠키 다 넣었으니까
            // 메인창에 알리고
            // 메인창이 리로딩을 하면 좋겠다
            setLoginCheck(true)
            setIframeVisible(false);
            window.parent.postMessage('navigateToURL','*')

          }else{
            const projectId = "6e9c40d1-1236-42c4-8a13-586e7df92327";
            const redirectUri = window.location.protocol + "//" + window.location.host + "/" + urlProps;
        
            const loginUrl = `https://bouns.io/_login/?client_id=${projectId}&redirect_uri=${redirectUri}`;
            setBounsURI(loginUrl)
        
            // window.location.href = loginUrl;
            // return(
            //   loginUrl
            // )
            setIframeVisible(true);
          }
        }
      },[LoginCheck])

      if(LoginCheck){
        return(
          null
        )
      }else{
        return(
          <>

          <iframe
          className="h-screen w-full scrollbar-hide "
          src= {bounsURI} 
          title="Bouns Login" 
          style={{ border: 'none', display: iframeVisible ? 'block' : 'none' }}>
          </iframe>
          </>


        )
      }
      
}