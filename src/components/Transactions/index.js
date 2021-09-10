import React from 'react'

import { Link } from 'react-router-dom'

import API from '../../API'

const TransactionList = (props) => {
    const transactions = props.transactions
    if (!transactions || transactions.length === 0) {
        return <div> <p> No Transactions. Add transactions please. </p> </div>
    }

    const handleDelete = async (event) => {
        const transactionId = parseInt(event.target.parentNode.parentNode.id);
        const res = await API.deleteTransactions(transactionId);
        const newTransactions = transactions.filter( transaction => transaction.id !== transactionId);
        const newAccounts = await API.fetchAccount(false,true)
        if (res.status === 204){
            props.transactionAccountHandler(newTransactions, newAccounts)
        } else {
            alert(res)
        }
    }

    const handleEdit = (event) => {
        const transactionId = parseInt(event.target.parentNode.parentNode.id);
        props.transactionIdHandler(transactionId);
    }

    return (
        <div className='border rounded border-white p-2 m-2'>
            <table className='table table-dark table-striped'>

                <thead><tr><th className='bg-dark' colSpan='6'>Transactions</th></tr></thead>
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>

                    {transactions.map((transaction) => (
                        <tr key={transaction.id} id={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.credit_account}</td>
                            <td>{transaction.debit_account}</td>
                            <td>{transaction.transaction_date.match(/\d{4,}-\d{2}-\d{2}/)}</td>
                            <td>{transaction.amount}</td>
                            <td><button className='btn btn-danger' onClick={handleDelete}>Del</button>
                            <button className='btn btn-success' data-toggle='modal' data-toggle='modal' data-target={`#tModal`} onClick={handleEdit}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <Link to='/transactions'> <button className='btn btn-dark w-100'><b>All Transactions</b></button> </Link>

        </div>)
        ;
}

export default TransactionList;