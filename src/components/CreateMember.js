import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from 'react-hook-form';
import { FaUser, FaRegAddressBook, FaBirthdayCake  } from "react-icons/fa";
import { AiFillPhone  } from "react-icons/ai";


export default function CreateMember() {

    const { register, handleSubmit } = useForm();

    const [date, setDate] = useState('')

    const onChangeDate = date => {
        setDate(date)
    }

    const onSubmitData = data => {

        const member = {
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: date,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            // image: data.picture
        }

        
        axios.post('http://localhost:5000/members/add', member)
            .then(res => console.log(res.data))
    
        // window.location = '/';
    }

    return (
        <div className="form-group">
            <form onSubmit  ={handleSubmit(onSubmitData)}>
                <div className="input-container">
                    <FaUser size={20} className="icon"/><input className="form-control" type="text" name="firstName" placeholder="First name" ref={register} onFocus="this.placeholder = '' "/>
                    <input className="form-control" type="text" name="lastName" placeholder="Last name" ref={register} />
                </div>

                <br/>
                <div className="input-gender">
                    <span id="male">Male</span> <input type="radio" value="Male" name="gender" ref={register} /> 
                    <span id="female">Female</span> <input type="radio" value="Female" name="gender" ref={register} /> 
                </div>
                
                <br/>
                <div className="input-add">
                    <FaRegAddressBook size={24} className="add-icon" /><input className="form-control" type="text" name="address" placeholder="Address" ref={register} />
                </div>
              
                <br/>
                <div className="input-phone">
                    <AiFillPhone size={22} className="phone-icon"/>
                    <input className="form-control" type="text" name="phoneNumber" placeholder="Phone Number" ref={register} />
                </div>
                {/* <input type="file" name="picture" ref={register} /> */}
                <br/>
                <div className="input-bod">
                    <FaBirthdayCake size={18}  className="bod-icon"/>
                    <DatePicker
                        selected = {date}
                        onChange = {onChangeDate}
                    />
                </div>
                <br/>
                <div className="subBtn">
                    <input type="submit" 
                    className="submit-form"/>
                </div>
            </form> 
        </div>
    )
}
