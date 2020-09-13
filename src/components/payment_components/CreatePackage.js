import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreatePackage() {

    const [packages, setPackages] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:5000/packages/')
        .then(res => {
            setPackages(res.data)
        })
        .catch(err => console.log(err))
    }, [])
    return (
        <div>
            
        </div>
    )
}
