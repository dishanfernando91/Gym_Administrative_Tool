import React from 'react'
import PaymentHistory from './PaymentHistory'
import Payments from './Payments'

export default function PaymentTable({ paymentObjects }) {

    const paymentList = () => {
        return paymentObjects.map(payment => {
            return <Payments payment={payment} />
        })
    }
    return (
        <div className="pyt-table-container">
            <div className="container pyt-table">
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th style={{width: "8%"}}>ID</th>
                    <th style={{width: "20%"}}>Name</th>
                    <th style={{width: "20%"}}>Package</th>
                    <th style={{width: "10%"}}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentList()}
                </tbody>
                </table>
            </div>
        </div>
    )
}
