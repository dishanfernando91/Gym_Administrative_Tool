import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

export default function CreatePayment() {

    const { handleSubmit, control } = useForm();
    const [packages, setPackages] = useState([])
    const [allPayments, setAllPayments] = useState({});
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMemeber] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/packages/')
        .then(res => {
            setPackages(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/members/')
        .then(res => {
            setMembers(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/payments/')
        .then(res => {
            setAllPayments(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    const memberOptions = members.map(member => {
       return {value: member, label: `${member.firstName} ${member.lastName}`}
    })
    //package --> gymPackage, package is reserved
    const packageOptions = packages.filter(gymPackage => gymPackage.status).map(gymPackage => {
           return {value: gymPackage, label: gymPackage.title} 
    });
   
    const months = [    
        {value: "January", label: "January"},
        {value: "February", label: "February"},
        {value: "March", label: "March"},
        {value: "April", label: "April"},
        {value: "May", label: "May"},
        {value: "June", label: "June"},
        {value: "July", label: "July"},
        {value: "August", label: "August"},
        {value: "September", label: "September"},
        {value: "October", label: "October"},
        {value: "November", label: "November"},
        {value: "December", label: "December"}
        ];

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().toLocaleDateString('default', {month: 'long'});

    const onSubmitData = data => {

        const lastEntry = allPayments[allPayments.length - 1]
        const allMonths = allPayments.map(record => record.month)
        const allYears = allPayments.map(record => record.year)

        const diffMonth = newMonth => {
            for(let i = 0; i < allPayments.length; i++){
                if(((allPayments[i].year).toString() === currentYear.toString()) && ((allPayments[i].month).toString()) === newMonth.toString())
                    return allPayments[i]._id 
            }
        }

        const payment = {   
            month: data.months.value,
            payments: {
                memberID: data.member.value._id,
                package: data.gymPackage.value._id
            }
        }
        
        if(allPayments.length === 0){
            axios.post('http://localhost:5000/payments/add', payment)
                .then(res => console.log(res.data))    

        } else if(currentMonth === lastEntry.month && currentYear === lastEntry.year) {
            axios.put(`http://localhost:5000/payments/update/${lastEntry._id}`, payment)
                .then(res => console.log(res.data))    

        } else if(allMonths.includes(data.months.value) && allYears.includes(currentYear.toString())){
            axios.put(`http://localhost:5000/payments/update/${diffMonth(data.months.value)}`, payment)
               .then(res => console.log(res.data))   

        } else {
            axios.post('http://localhost:5000/payments/add', payment)
                .then(res => console.log(res.data))
        }
        
        window.location.reload(false);
    }  

    return (
        <>
        <h3 className="pyt-head">Payment Selection</h3>
        <div className="pyt-container">
            <div className="pyt-form">
                <form onSubmit={handleSubmit(onSubmitData)}>
                {/* <Controller
                    as={<Select />}
                    name=""
                    control={control}
                    placeholder="Member ID"
                    className="pyt-selector"
                /> */}
                <Controller
                    as={<Select 
                        options={months}/>}
                    name="months"
                    control={control}
                    isSearchable
                    defaultValue={{ value: currentMonth, label: currentMonth }}
                    className="pyt-selector"
                />
                <Controller
                    as={<Select options={memberOptions}/>}
                    name="member"
                    control={control}
                    isSearchable
                    placeholder="Enter Name"
                    className="pyt-selector"
                />
                <Controller
                    as={<Select options={packageOptions}/>}
                    name="gymPackage"
                    control={control}
                    isSearchable
                    placeholder="Package"
                    className="pyt-selector"
                />
                <input type="submit" className="pyt-form-btn"/>
                </form>
            </div>
            <div className="pyt-history-link">
                <Link className="pyt-history-text" to={`/payments/history`}>View Payment History</Link>
            </div>
        </div>
        </>
    )
}
