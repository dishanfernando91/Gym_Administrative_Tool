import React from 'react';

export default function Payment( {payment}) {

    const { name, packages, date } = payment;
    return (        
            <tr className="table-row">
                <td>Pending</td>
                <td>{name}</td>
                <td>{packages}</td>
                <td>{date}</td>
            </tr>
    )
}
