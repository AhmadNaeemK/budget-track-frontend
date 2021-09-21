import React from 'react'

import API from '../../API'

const AccountsList = (props) => {

    const accounts = props.accounts
    if (!accounts || accounts.length === 0) {
        return <div> <p> No accounts. Add accounts please. </p> </div>
    }

    const handleDelete = async (event) => {
        const accountId = parseInt(event.target.parentNode.parentNode.id);
        const res = await API.deleteCashAccount(accountId);
        
        const newAccounts = accounts.filter( account => account.id !== accountId);

        const expenses = await API.fetchExpenseList(new Date().getMonth() + 1)

        if (res.status === 204){
            props.transactionAccountHandler( 'expenses', expenses, newAccounts);
        }
    }

    const handleEdit = (event) => {
        const accountId = parseInt(event.target.parentNode.parentNode.id);
        props.accountIdHandler(accountId);
    }

    return (
            <table className='table table-dark table-striped'>

                <thead><tr><th className='bg-dark' colSpan='6'>Accounts</th></tr></thead>
                <tbody>
                    <tr>
                        <th scope='col'>Id</th>
                        <th scope='col'>Title</th>
                        <th scope='col'>Balance</th>
                        <th scope='col'>Limit</th>
                        <th scope='col'>Total Expenses</th>
                        <th></th>
                    </tr>

                    {accounts.map((account , index) => (
                        <tr key={account.id} id={account.id}>
                            <td>{account.id}</td>
                            <td>{account.title}</td>
                            <td>{account.balance}</td>
                            <td>{account.limit}</td>
                            <td>{account.expenses}</td>
                            <td>
                                { index!=0 && <>
                                <button className='btn btn-danger' onClick={handleDelete}>Del</button>
                                </>
                                }
                                <button className='btn btn-success'  data-toggle='modal' data-target={`#aModal`} onClick={handleEdit}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            );

} 

export default AccountsList