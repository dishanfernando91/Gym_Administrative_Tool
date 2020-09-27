import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Select from 'react-select';
import PaymentTable from './PaymentTable';
import UnpaidTracker from './UnpaidTracker';

export default function PaymentHistory() {

    const [allPayments, setAllPayments] = useState([]);
    const [allPackages, setAllPackages] = useState([]);
    const [allMembers, setAllMembers] = useState([])

    const [viewAll, setViewAll] = useState(false);
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [selectedYears, setSelectedYears] = useState([]);

    const [paymentObjects, setPaymentObjects] = useState([]);
    const [unpaidMembers, setUnpaidMembers] = useState([]);
     
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

    //Generate unique years to display in select option...
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

    //Generate unique months to display in select option...
    const monthRange = () => {
        const months = [];
        for(let i = 0; i < allPayments.length; i++) {
            months.push(allPayments[i].month)
        }
        return months;
    }
    const distinctMonths = [...new Set(monthRange())];

                //---Sort generated set of unique months in chronological order---
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


    //handle event listeners functions.
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
            setUnpaidMembers([])

        } else {
            let selectedPayments = [];
            let selectedPackages = [];
            let selectedDates = [];
            let unpaid = [];

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

            //Extract members from all members who has not paid for the queried period and create object.
            unpaid = allMembers.filter(member => !selectedPayments.includes(member._id))
            const unpaidMembers = unpaid.map(member => {
               return {
                   name: `${member.firstName} ${member.lastName}`
               }
           });
           setUnpaidMembers(unpaidMembers);
            }
        }

        //Pending Payments Tracking
        const pendingPayments = () => unpaidMembers.map(member => {
            return <UnpaidTracker member={member} />
        })

    return (
        <div>
            <div className="pyt-history-form">
                <form onSubmit={handleSubmit}>
                    <input type="checkbox" onChange={() => handleChange()} checked={viewAll} /><label className="view-all-label">View All</label>
                    <div className="view_options" 
                    style = { viewAll ? {pointerEvents: "none", opacity: "0.5"} : {}}>
                        <div className="pyt-history-selects">
                        <Select 
                            options={yearOptions}
                            name="year"
                            placeholder="Select Year"
                            isSearchable
                            // isMulti
                            onChange={setSelectedYears}
                        />
                        <br/>
                        <Select 
                            options={monthOptions}
                            name="month"
                            placeholder="Select Month"
                            isSearchable
                            // isMulti
                            onChange={setSelectedMonths}
                        />
                        </div>
                    </div>
                    <input type="submit" value="Search" className="pyt-form-btn" style = { (selectedMonths.length === 0 || selectedYears.length === 0) ? {pointerEvents: "none", opacity: "0.5"} : {}}/>
                </form>
            </div>
            <div className="pyt-results">
                <div>
                    {paymentObjects.length !== 0 ? <PaymentTable paymentObjects={paymentObjects}/> : <div></div>}
                </div>
                {unpaidMembers.length != 0 ? 
                    <div className="pyt-pending">
                        <h6 style={{textAlign: "center", fontSize: "14px"}}>Pending Payments</h6>
                        {pendingPayments()}
                    </div>
                : <></>}
            </div>
        </div>
    )
}
