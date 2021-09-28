import React from 'react'

import API from '../../API'

const AccountsList = (props) => {

    const accounts = props.accounts
    if (!accounts || accounts.length === 0) {
        return <div> <p> No accounts. Add accounts please. </p> </div>
    }

    const handleDelete = async (event) => {
        const accountId = parseInt(event.target.id.split(/del-btn-/)[1]);
        const res = await API.deleteCashAccount(accountId);

        const newAccounts = accounts.filter(account => account.id !== accountId);

        const expenses = await API.fetchExpenseList(new Date().getMonth() + 1)

        if (res.status === 204) {
            props.transactionAccountHandler('expenses', expenses, newAccounts);
        }
    }

    const handleEdit = (event) => {
        const accountId = parseInt(event.target.id.split(/edit-btn-/)[1]);
        props.accountIdHandler(accountId);
    }

    return (
        <table className='table table-dark table-striped'>

            <thead><tr><th className='bg-dark' colSpan='10'>Accounts</th></tr></thead>
            <tbody>
                <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>Title</th>
                    <th scope='col'>Balance</th>
                    <th scope='col'>Limit</th>
                    <th scope='col'>Total Expenses</th>
                    <th colSpan='3'></th>
                </tr>

                {accounts.map((account, index) => (
                    <tr key={account.id} id={account.id}>
                        <td>{account.id}</td>
                        <td>{account.title}</td>
                        <td>{account.balance}</td>
                        <td>{account.limit}</td>
                        <td>{account.expenses}</td>
                        <td>
                        {index != 0 ?
                                <button id={`del-btn-${account.id}`} className='btn btn-outline-danger' onClick={handleDelete}>
                                    <i id={`del-btn-${account.id}`} className='fas fa-trash-alt'></i>
                                </button> : null
                        }
                        </td>
                        <td>
                            <button id={`edit-btn-${account.id}`} className='btn btn-outline-success' data-toggle='modal' data-target={`#aModal`} onClick={handleEdit}>
                                <i id={`edit-btn-${account.id}`} className='fas fa-edit'></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

}

export default AccountsList