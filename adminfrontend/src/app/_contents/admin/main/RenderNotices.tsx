"use client"


import { RenderNoticesProps } from "@/app/_features/admin/main";



export const RenderNotices:React.FC<RenderNoticesProps> = ({noticesListData}) => {

    if(noticesListData != null) {
        return (
        <>
        
            {noticesListData.map((item) => {
            if (item != null) {
                return (
                <div key={item.id}>
                    <p> 공지(공시)  id : {item.id} </p>
                    <p> 공지 제목 : {item.title} </p>
                    <p> 공지 설명 : {item.description} </p>
    
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