import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Member from './Member'
import axios from 'axios';

export default function MemberList() {

    const [members, setMembers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/members/')
        .then(res => {
            setMembers(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    //Delete Member functionality
    function deleteMember(id) {
        axios.delete(`http://localhost:5000/members/${id}`)
            .then(response => { console.log(response.data)});

        setMembers(members.filter(el => el._id !== id))
    }

    const memberList = () => {
        return members.map(currentMember => {
            return <Member member={currentMember} deleteMember={deleteMember} key={currentMember._id} />
        })
    }

    return (
        <div className="container">
            <table className="table">
            <thead className="thead-light">
                <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Commencement</th>
                </tr>
            </thead>
            <tbody>
                {memberList()}
            </tbody>
            </table>
        </div>
    )
}
