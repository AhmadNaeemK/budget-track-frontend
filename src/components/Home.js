import React from 'react'
import { useState, useEffect } from 'react';

import TransactionList from './Transactions';

import { TRANSACTION_URL } from '../Config';

const Home = () => {

    const [trans, setTrans] = useState([])

    let fetchTransactions = () => {
        fetch(TRANSACTION_URL+'?all=false', {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access'), 
            },
            user: {username: localStorage.getItem('username'),
                userid: localStorage.getItem('userid')},
        }).then(res => res.json())
        .then(result => setTrans(result));
    }

    useEffect(()=>{
        fetchTransactions()
    }, [])


    return (
        <div className='container-fluid m-2 p-2'>
            <div className=' row display-flex '>
                <TransactionList transactions = {trans} />
            </div>
        </div>
    );
}

export default Home;