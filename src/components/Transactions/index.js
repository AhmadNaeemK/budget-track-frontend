import React from 'react'

import { Link } from 'react-router-dom'

import API from '../../API'

const TransactionList = (props) => {
    const transactions = props.transactions
    if (!transactions || transactions.length === 0) {
        return <div> <p> No Transactions. Add transactions please. </p> </div>
    }

    const handleDelete = async (event) => {
        const incomeCategory = props.categories.find(category => category[1] === "Income")[0]

        const transactionId = parseInt(event.target.parentNode.parentNode.id);
        const transaction = props.transactions.find(transaction => transaction.id === transactionId)
        const transactionType = transaction.category === incomeCategory ? 'incomes' : 'expenses';

        let res;

        if (props.transactionType === 'Scheduled') {
            res = await API.deleteScheduledTransaction(transactionId)
        } else {
            res = transactionType === 'incomes' ? await API.deleteIncome(transactionId) : await API.deleteExpense(transactionId)
        }

        if (res && res.status === 204) {
            props.transactionAccountHandler(transactionType)
        } else {
            alert(await res.json())
        }
    }

    const handleEdit = (event) => {
        const transactionId = parseInt(event.target.parentNode.parentNode.id);
        props.transactionEditHandler(transactions.find(transaction => transaction.id === transactionId));
    }

    return (
        <table className='table table-dark table-striped'>

            <thead><tr><th className='bg-dark' colSpan='7'>{props.transactionType}</th></tr></thead>
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Cash Account</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th></th>
                </tr>

                {transactions.map((transaction) => (
                    <tr key={transaction.id} id={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.title}</td>
                        <td>{props.cashAccounts.find(account => account.id === transaction.cash_account).title}</td>
                        {props.transactionType === 'Scheduled' ?
                            <td>{transaction.scheduled_time.match(/\d{4,}-\d{2}-\d{2}/)}</td> :
                            <td>{transaction.transaction_time.match(/\d{4,}-\d{2}-\d{2}/)}</td>
                        }
                        <td>{props.categories[transaction.category][1]}</td>
                        <td>{transaction.amount}</td>
                        <td>
                            <button className='btn btn-danger' onClick={handleDelete}><i className="fas fa-trash-alt"></i></button>
                            {props.transactionType !== 'Scheduled' &&
                                <button className='btn btn-success' data-toggle='modal' data-toggle='modal' data-target={`#tModal`} onClick={handleEdit}>
                                    <i className="far fa-edit"></i>
                                </button>
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    );
}

export default TransactionList;