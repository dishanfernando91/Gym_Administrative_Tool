import React from 'react';
// import { BiWrench } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";

export default function PackageDetails(props) {
    return (
   <div className="pkg-card">
        <div className="pkg-card-group">
            <span>Package:</span> {props.package.title}
            <br/>
            <span>Fee: </span>Rs.{props.package.fee}
        </div>
        <div>
            <button type="submit" onClick={()=>props.deletePackage(props.package._id)}><FaTrash size={14} /></button>
        </div>
    </div>
    )
}
