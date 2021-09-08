import React from 'react';

import API from '../API';
import { monthNames } from '../Config';

import AccountsForm from './AccountsForm';

import CashAccountsChart from './Charts/CashAccountChart'
import ExpenseAccountsChart from './Charts/ExpenseAccountsChart';

class AllAccounts extends React.Component {

    constructor(props) {
        super(props)

        this.state ={
            accounts : [],
            expenseAccountsData: [],
            accountId: null,
            month: new Date().getMonth() + 1,
        }
    }

    handleDelete = async (event) => {
        const accountId = parseInt(event.target.parentNode.parentNode.id);
        const res = await API.deleteAccount(accountId);

        const accounts = await API.fetchAccount(false,false,true);
        const expenseAccountData = await API.getExpenseAccountsData(this.state.month)

        if (res.status === 204){
            this.setState({accounts: accounts, expenseAccountsData: expenseAccountData});
        }
    }

    handleEdit = (event) => {
        const accountId = parseInt(event.target.parentNode.parentNode.id);
        this.setState({ accountId: accountId })
    }

    accountHandler = async () => {
        const accounts = await API.fetchAccount(false,false,true);
        const expenseAccountData = await API.getExpenseAccountsData(this.state.month)
        this.setState({accounts: accounts, expenseAccountsData: expenseAccountData});
    }

    componentDidMount() {
        (async () => {
            const accounts = await API.fetchAccount(false,false,true);
            const expenseAccountData = await API.getExpenseAccountsData(this.state.month)
            this.setState({accounts: accounts, expenseAccountsData: expenseAccountData});
        })();
    }

    render () {
        return (
            <div className='m-2 p-2'>
                <div className='d-flex justify-content-center'>

                    <div className='w-20'>
                    <CashAccountsChart accounts={this.state.accounts} />
                    </div>

                    <div className='w-20'>
                    <ExpenseAccountsChart expenseAccounts={this.state.expenseAccountsData} month={monthNames[this.state.month - 1]} />
                    </div>

                    <AccountsForm className='w-50'
                            title='Create Accounts' accountHandler={this.accountHandler}/>
                </div>


                <div className='border rounded border-white p-2 m-2'>
                    <table className='table table-dark table-striped'>

                        <thead><tr><th className='bg-dark' colSpan='7'>Accounts</th></tr></thead>
                        <tbody>
                            <tr>
                                <th >Id</th>
                                <th >Category</th>
                                <th >Title</th>
                                <th >Credit</th>
                                <th >Debit</th>
                                <th >Balance</th>
                                <th></th>
                            </tr>

                            {this.state.accounts.map((account) => (
                                <tr key={account.id} id={account.id}>
                                    <td >{account.id}</td>
                                    <td >{account.category}</td>
                                    <td >{account.title}</td>
                                    <td >{account.credit}</td>
                                    <td >{account.debit}</td>
                                    <td >{account.balance}</td>
                                    <td ><button className='btn btn-danger' onClick={this.handleDelete}>Del</button>
                                    <button className='btn btn-success' data-toggle='modal' data-toggle='modal' data-target={`#aModal`} onClick={this.handleEdit}>Edit</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="modal fade" id="aModal" tabIndex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalLongTitle">Edit Account</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <AccountsForm
                            accountId= {this.state.accountId}
                            accountHandler = {this.accountHandler}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default AllAccounts;