import React from 'react';
// import { BiWrench } from "react-icons/bi";
import { AiFillStop } from "react-icons/ai";

export default function PackageDetails(props) {
    return (
   <div className={`pkg-card ${!props.package.status ? "pkg-inactive": {}}`} >
        <div className="pkg-card-group" >
            <span>Package:</span> {props.package.title}
            <br/>
            <span>Fee: </span>Rs.{props.package.fee}
        </div>
        <div>
            <button type="submit" onClick={()=>props.setInactive(props.package._id)}><AiFillStop size={14} /></button>
        </div>
    </div>
    )
}
