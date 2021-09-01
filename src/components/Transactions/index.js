import React from 'react'

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
        if (res.status === 204){
            props.transactionHandler(newTransactions);
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
                        <th scope='col'>Id</th>
                        <th scope='col'>From</th>
                        <th scope='col'>To</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Amount</th>
                        <th></th>
                    </tr>

                    {transactions.map((transaction) => (
                        <tr key={transaction.id} id={transaction.id}>
                            <td scope='col'>{transaction.id}</td>
                            <td scope='col'>{transaction.credit_account}</td>
                            <td scope='col'>{transaction.debit_account}</td>
                            <td scope='col'>{transaction.transaction_date.match(/\d{4,}-\d{2}-\d{2}/)}</td>
                            <td scope='col'>{transaction.amount}</td>
                            <td scope='col'><button className='btn btn-danger' onClick={handleDelete}>Del</button>
                            <button className='btn btn-success' data-toggle='modal' data-toggle='modal' data-target={`#tModal`} onClick={handleEdit}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>)
        ;
}

export default TransactionList;