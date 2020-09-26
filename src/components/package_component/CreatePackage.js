import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import PackageDetails from './PackageDetails'

export default function CreatePackage() {

    const { register, handleSubmit } = useForm();
    const [packages, setPackages] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:5000/packages/')
        .then(res => {
            setPackages(res.data)
        })
        .catch(err => console.log(err))
    }, [])
    
    const onSubmitData = data => {
        const packageInfo = {
            title: data.title,
            fee: data.fee,
            duration: data.duration,
        }
        axios.post('http://localhost:5000/packages/add', packageInfo)
            .then(res => console.log(res.data))
        window.location = '/packages';
    }  
    
    const packageList = () => {
        return packages.map(currentPackage => {
            return <PackageDetails package={currentPackage} key={currentPackage._id} setInactive={setInactive}/>
        })
    }

    const setInactive = id => {
        const {title, fee, duration, status} = packages.find(packages => packages._id === id)

        const packageInfo = {
            title,
            fee,
            duration,
            status: !status
        }
        axios.post(`http://localhost:5000/packages/update/${id}`, packageInfo)
            .then(response => {
                console.log(response.data)
            });
            
        window.location = './packages'
    }

    return (
        <div className="container">
            <div className="pkg-group">
                {packageList()}
            </div>
            <form onSubmit={handleSubmit(onSubmitData)}>
                <div className="pkg-form">
                    <input type="text" placeholder="Package title" name="title" ref={register}/>
                    <input type="text" placeholder="Fee" name="fee" ref={register}/>
                    <input type="text" placeholder="Duration of Package" name="duration" ref={register}/>
                </div>
                <div className="pkg-button">
                    <input type="submit" 
                    className="submit-form"/>
                </div>
            </form>
        </div>
    )
}
