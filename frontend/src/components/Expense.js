import React, { useEffect, useState } from 'react'
import ExpenseTable from './ExpenseTable.js'
import axios from 'axios';

const Expense = () => {
    const adminloginInfo = JSON.parse(localStorage.getItem('adminLoginInfo'));
    const userLoginInfo = JSON.parse(localStorage.getItem('userLoginInfo'));
    if (adminloginInfo) {
        var companyID = adminloginInfo._id
        var userID = adminloginInfo._id
        var token = adminloginInfo?.token
    }
    if (userLoginInfo) {
        var companyID = userLoginInfo.companyID
        var userID = userLoginInfo._id
        var token = adminloginInfo?.token
    }

    // config

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`

        }
    }



    const [userExpenseInfo, setUserExpenseInfo] = useState([])
    const [formData, setFromData] = useState({ companyID: companyID, userID: userID });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFromData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('http://localhost:8000/api/add-expense', formData , config)
            console.log(data)
        } catch (error) {
            console.log("error from create expense api", error)
        }
    }

    // get user Expense data 

    const getUsersExpress = async () => {
        try{
        const { data } = await axios.get(`http://localhost:8000/api/user-expense/?userID=${userID}`, config)
        setUserExpenseInfo(data.expenses)
        }catch(error){
            console.log("error from get user expense api", error)
        }
    }


    useEffect(() => {
        getUsersExpress()
    }, [])


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} name="expense" placeholder='Expense name' /> <br />
                <input onChange={handleChange} name="date" placeholder='Date ' /><br />
                <input onChange={handleChange} name="amount" placeholder='Amount ' /><br />
                <input onChange={handleChange} name="description" placeholder='Description ' /><br />
                <button type='submit'>submit</button>
            </form>
            <ExpenseTable userExpenseInfo={userExpenseInfo} />
        </div>
    )
}

export default Expense