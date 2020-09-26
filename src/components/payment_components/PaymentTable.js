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
        <div>
            <div className="container">
            <table className="table">
            <thead className="thead-light">
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Package</th>
                <th>Date</th>
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
