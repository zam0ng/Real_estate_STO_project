import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import web3 from "web3";
import axios from "axios";
import {Cookies} from "react-cookie"




export default function useCookie(){



    const cookies = new Cookies();

          const isCookie =cookies.get('accessToken');
          if(isCookie){
            return isCookie;
          }else{

            let parsedUrl = new URL(window.location.href);
            const accessToken = parsedUrl.searchParams.get("access_token");
            const refreshToken = parsedUrl.searchParams.get("refresh_token");
      
            if (typeof accessToken == 'string' && typeof refreshToken == 'string') {
  
              cookies.set('accessToken' ,accessToken,{maxAge : 60 * 60 * 2, path : "/"})
              cookies.set('refreshToken' ,refreshToken,{maxAge : 60 * 60 * 3, path : "/"})

  

              return("cookie set")
            }else{
              return("cookie not found")
            }
          }
      
}