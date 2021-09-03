import React from 'react'

import API from '../../API'

import { Link } from 'react-router-dom'

const AccountsList = (props) => {

    const accounts = props.accounts
    if (!accounts || accounts.length === 0) {
        return <div> <p> No accounts. Add accounts please. </p> </div>
    }

    const handleDelete = async (event) => {
        const accountId = parseInt(event.target.parentNode.parentNode.id);
        const res = await API.deleteAccount(accountId);
        const newAccounts = API.fetchAccount(false,false,true)
        const newTransactions = await API.fetchTransactions(false);

        if (res.status === 204){
            props.transactionAccountHandler(newTransactions, newAccounts);
        }
    }

    const handleEdit = (event) => {
        const accountId = parseInt(event.target.parentNode.parentNode.id);
        props.accountIdHandler(accountId);
    }

    return (
        <div className='border rounded border-white p-2 m-2'>
            <table className='table table-dark table-striped'>

                <thead><tr><th className='bg-dark' colSpan='6'>Accounts</th></tr></thead>
                <tbody>
                    <tr>
                        <th scope='col'>Id</th>
                        <th scope='col'>Category</th>
                        <th scope='col'>Title</th>
                        <th scope='col'>Credit</th>
                        <th scope='col'>Debit</th>
                        <th></th>
                    </tr>

                    {accounts.map((account) => (
                        <tr key={account.id} id={account.id}>
                            <td>{account.id}</td>
                            <td>{account.category}</td>
                            <td>{account.title}</td>
                            <td>{account.credit}</td>
                            <td>{account.debit}</td>
                            <td><button className='btn btn-danger' onClick={handleDelete}>Del</button>
                            <button className='btn btn-success' data-toggle='modal' data-toggle='modal' data-target={`#aModal`} onClick={handleEdit}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Link to='/accounts'> <button className='btn btn-dark w-100'><b>All Accounts</b></button> </Link>
        </div>)
        ;

} 

export default AccountsList