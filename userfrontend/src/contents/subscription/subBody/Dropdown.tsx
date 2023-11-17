import React from "react"
import { SubAllList } from "../../../features/SubAllList"

type DropdownProps = {
    props : SubAllList | string;
}

export default function Dropdown({props} : DropdownProps){

    if(typeof props === 'string'){
        return(
            <div className="relative flex flex-col items-center h-16 rounded-lg border border-black">
                <button className="w-full h-full bg-slate-200 shadow-2xl">{props}</button>
            </div>
        )
    }

    return <div className="relative flex flex-col items-center h-16 rounded-lg border border-black">
        <button className="w-full h-full bg-slate-200 shadow-2xl">{props.subscription_address}</button>
    </div>

}