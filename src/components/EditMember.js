import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from 'react-hook-form';

import { FaUser, FaRegAddressBook, FaBirthdayCake, FaWeight, FaPercentage } from "react-icons/fa";
import { AiFillPhone, AiOutlineColumnHeight  } from "react-icons/ai";
import { GiEncirclement } from "react-icons/gi";


export default function EditMember(props) {

    const [date, setDate] = useState(null);
    const [member, setMember] = useState({
        firstName: '',
        lastName: '',
        gender: '', 
        address: '',
        phoneNumber: '',
        features: {
            height: '',
            weight:'',
            bodyFat:'',
            waist:''
        }
    })
    
    const onChangeDate = date => {
        setDate(date)
    }

    const handleRadioChange = e => {
        setMember({...member, gender: e.target.value})
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/members/${props.match.params.id}`)
            .then(res => {
                setMember({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    address: res.data.address,
                    phoneNumber: res.data.phoneNumber,
                    gender: res.data.gender,
                    features: {
                        height: res.data.features.height,
                        weight: res.data.features.weight,
                        bodyFat: res.data.features.bodyFat,
                        waist: res.data.features.waist,
                    }
                });
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/members/${props.match.params.id}`)
            .then(res => {
                setDate(Date.parse(res.data.dateOfBirth));
            })
    }, []);

    const { register, handleSubmit } = useForm();

    const onSubmitData = data => {
        const updatedMember = {
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: date,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            features: {
                height: data.features.height,
                weight: data.features.weight,
                bodyFat: data.features.bodyFat,
                waist: data.features.bodyFat
            }
        } 
        console.log(updatedMember)
        axios.post(`http://localhost:5000/members/update/${props.match.params.id}`, updatedMember)
            .then(res => console.log(res.data))

        window.location = '/show/';
    }

    return (
        <div className="form-group">
            <form onSubmit  ={handleSubmit(onSubmitData)}>
                <div className="input-container">
                    <FaUser size={20} className="icon"/>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="firstName" 
                        defaultValue={member.firstName}
                        placeholder="First name" 
                        ref={register} 
                    />
                    <input 
                        className="form-control" 
                        type="text" 
                        name="lastName" 
                        defaultValue={member.lastName}
                        placeholder="Last name" 
                        ref={register} 
                    />
                </div>

                <br/>
                <div className="input-gender">
                    <span id="male">Male</span>
                    <input 
                        type="radio" 
                        value="Male" 
                        name="gender"
                        ref={register}
                        checked = {member.gender === "Male" ? true : false}
                        onChange = {handleRadioChange}
                    /> 
                    <span id="female">Female</span> 
                        <input 
                        type="radio" 
                        value="Female" 
                        name="gender" 
                        ref={register} 
                        checked = {member.gender === "Female" ? true : false}
                        onChange = {handleRadioChange}
                    /> 
                </div>
                
                <br/>
                <div className="input-add">
                    <FaRegAddressBook size={24} className="add-icon" />
                    <input 
                        className="form-control" 
                        type="text" 
                        name="address" 
                        placeholder="Address" 
                        ref={register}
                        defaultValue={member.address}
                    />
                </div>
              
                <br/>
                <div className="input-phone">
                    <AiFillPhone size={22} className="phone-icon"/>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="phoneNumber" 
                        placeholder="Phone Number" 
                        ref={register} 
                        defaultValue={member.phoneNumber}
                    />
                </div>
                <br/>
                <div className="input-bod">
                    <FaBirthdayCake size={18}  className="bod-icon"/>
                    <DatePicker
                        selected = {date}
                        onChange = {onChangeDate} 
                        placeholderText="Select date"   
                    />
                </div>
                <div className="features-group">
                    <h6>Features: </h6>
                    <div className="features-input">
                        <div>
                            <AiOutlineColumnHeight className="features-icon" size={16} />
                            <input 
                                type="text" 
                                placeholder="Height" 
                                name="features.height" 
                                ref={register}
                                defaultValue={member.features.height}
                            />cm
                        </div>
                        <div>
                            <FaWeight className="features-icon" size={14} />
                            <input 
                                type="text" 
                                placeholder="Weight" 
                                name="features.weight" 
                                ref={register}
                                defaultValue={member.features.weight}
                            />kg
                        </div>
                        <div>
                            <FaPercentage className="features-icon" size={14} />
                            <input 
                                type="text" 
                                placeholder="Body Fat Percentage" 
                                name="features.bodyFat" 
                                ref={register}
                                defaultValue={member.features.bodyFat}
                            />%
                        </div>
                        <div>
                            <GiEncirclement className="features-icon" size={14} />
                            <input 
                                type="text" 
                                placeholder="Waist" 
                                name="features.waist" 
                                ref={register}
                                defaultValue={member.features.waist}
                            />cm
                        </div>
                    </div>
                </div>
                <br/>
                <div className="subBtn">
                    <button type="submit" className="submit-form">Edit Log</button>
                </div>
            </form> 
        </div>
    )
}
