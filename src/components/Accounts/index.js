import React from 'react'

import API from '../../API'

const AccountsList = (props) => {

    const accounts = props.accounts
    if (!accounts || accounts.length === 0) {
        return <div> <p> No accounts. Add accounts please. </p> </div>
    }

    const handleDelete = async (event) => {
        const accountId = parseInt(event.target.parentNode.parentNode.id);
        const res = await API.deleteAccount(accountId);
        const newAccounts = accounts.filter( account => account.id !== accountId);
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
                            <td scope='col'>{account.id}</td>
                            <td scope='col'>{account.category}</td>
                            <td scope='col'>{account.title}</td>
                            <td scope='col'>{account.credit}</td>
                            <td scope='col'>{account.debit}</td>
                            <td scope='col'><button className='btn btn-danger' onClick={handleDelete}>Del</button>
                            <button className='btn btn-success' data-toggle='modal' data-toggle='modal' data-target={`#aModal`} onClick={handleEdit}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>)
        ;

} 

export default AccountsList