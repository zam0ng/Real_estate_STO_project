"use client"

import { RenderBlackListProps } from "@/app/_features/admin/main";


export const RenderBlackList:React.FC<RenderBlackListProps> = ({blacklistData}) => {

    if(blacklistData != null) {
        return (
        <>
        
            {blacklistData.map((item) => {
            if (item != null) {
                return (
                <div key={item.id}>
                    <p> 유저  id : {item.id} </p>
                    <p> 블랙리스트 여부 : {item.isInBlackList} </p>
                    <p> 왜 블랙 유저 인지 설명 : {item.description} </p>
    
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
                );
            }
            })}
        </>
        );
    }
};