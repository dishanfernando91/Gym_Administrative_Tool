import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Select from 'react-select';
import PaymentTable from './PaymentTable';

export default function PaymentHistory() {

    const [allPayments, setAllPayments] = useState([]);
    const [allPackages, setAllPackages] = useState([]);
    const [allMembers, setAllMembers] = useState([])

    const [viewAll, setViewAll] = useState(false);
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [selectedYears, setSelectedYears] = useState([]);

    const [paymentObjects, setPaymentObjects] = useState([]);
     
    useEffect(() => {
        axios.get('http://localhost:5000/payments/')
        .then(res => {
            setAllPayments(res.data)
        })
        .catch(err => console.log(err))

        axios.get('http://localhost:5000/packages/')
        .then(res => {
            setAllPackages(res.data)
        })
        .catch(err => console.log(err))

        axios.get('http://localhost:5000/members')
        .then(res => {
        setAllMembers(res.data)
    })
    .catch(err => console.log(err))
    }, [])

    //Generate unique years in database
    const yearRange = () => {
        const years = [];
        for(let i = 0; i < allPayments.length; i++) {
            years.push(Number(allPayments[i].year))
        }
        return years;
    }   
    const distinctYears = [...new Set(yearRange())];
    const yearOptions = distinctYears.map(year => {
        return {value: year, label: year}
    })

    //Generate unique months in database
    const monthRange = () => {
        const months = [];
        for(let i = 0; i < allPayments.length; i++) {
            months.push(allPayments[i].month)
        }
        return months;
    }
    const distinctMonths = [...new Set(monthRange())];

    const sortByMonth = arr => {
        const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
        return arr.sort(function(a, b){
            return (months.indexOf(a) - months.indexOf(b));
        });
      }
    const sortedMonth = sortByMonth(distinctMonths);
    const monthOptions = sortedMonth.map(month => {
        return {value: month, label: month}
    })

    //handle event listeners functions.........
    const handleChange = () => {
        setViewAll(!viewAll)
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(viewAll){
            let viewAllPayments = [];
            let viewAllPackages = [];
            let viewAllDates = [];

            for(let i = 0; i < allPayments.length; i++){
                for(let j = 0; j < (allPayments[i].payments).length; j++){
                viewAllPayments.push(allPayments[i].payments[j].memberID);
                viewAllPackages.push(allPayments[i].payments[j].package);
                viewAllDates.push(allPayments[i].payments[j].Date.slice(5, 10));
                }
            }
            
           const paymentObjects = viewAllPayments.map((element, index) => {
                const member = allMembers.find(member => member._id == viewAllPayments[index]);
                const pkg = allPackages.find(packages => packages._id == viewAllPackages[index]);

                return {
                    name: `${member.firstName} ${member.lastName}`,
                    packages: `${pkg.title} - Rs.${pkg.fee} ${!pkg.status ? "(Inactive)" : ""}`,
                    date: viewAllDates[index]
                }
            });
            setPaymentObjects(paymentObjects);

        } else {
            let selectedPayments = [];
            let selectedPackages = [];
            let selectedDates = [];

            for(let i = 0; i < allPayments.length; i++){
                if(allPayments[i].year == selectedYears.value && allPayments[i].month == selectedMonths.value){
                    selectedPayments = allPayments[i].payments.map(payment => payment.memberID)
                    selectedPackages = allPayments[i].payments.map(payment => payment.package)
                    selectedDates = allPayments[i].payments.map(payment => payment.Date.slice(5, 10))
                }   
            }
            
           const paymentObjects = selectedPayments.map((element, index) => {
                const member = allMembers.find(member => member._id == selectedPayments[index]);
                const pkg = allPackages.find(packages => packages._id == selectedPackages[index]);

                return {
                    name: `${member.firstName} ${member.lastName}`,
                    packages: `${pkg.title} - Rs.${pkg.fee} ${!pkg.status ? "(Inactive)" : ""}`,
                    date: selectedDates[index]
                }
            });
            setPaymentObjects(paymentObjects);
            }   
        }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="checkbox" onChange={() => handleChange()} checked={viewAll} /><label>View All</label>
                <div className="view_options" 
                style = { viewAll ? {pointerEvents: "none", opacity: "0.5", background: "#ccc"} : {}}>
                    <Select 
                        options={monthOptions}
                        name="month"
                        placeholder="Select Month"
                        isSearchable
                        // isMulti
                        onChange={setSelectedMonths}
                    />
                    <Select 
                        options={yearOptions}
                        name="year"
                        placeholder="Select Year"
                        isSearchable
                        // isMulti
                        onChange={setSelectedYears}
                    />
                </div>
                <input type="submit" value="Search" />
            </form>
            <PaymentTable paymentObjects={paymentObjects} />
        </div>
    )
}
