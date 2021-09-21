import React from 'react'

import API from '../../API'

class AccountsForm extends React.Component {

    initialState = {
        title: '',
        balance: '',
        limit: '',
        user: localStorage.getItem('userid')
    }

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.props.title === "Create Accounts") {
            const res = await API.createCashAccount(this.state);
            if (res && res.status === 201) {
                const cashAccounts = await API.fetchCashAccountList()
                this.props.accountHandler(cashAccounts)
                this.setState(this.initialState)
            } else {
                const error = await res.json()
                alert(error[Object.keys(error)[0]])
            }
        } else {
            let newState = {};
            for (let s in this.state) {
                if (this.state[s] !== '') newState = { ...newState, [s]: this.state[s] }
            }
            const res = await API.updateCashAccount(this.props.accountId, newState)
            if (res.status === 200) {
                const cashAccounts = await API.fetchCashAccountList()
                this.props.accountHandler(cashAccounts)
                this.setState(this.initialState)
            } else {
                const error = await res.json()
                alert(error[Object.keys(error)[0]])
            }
        }
        event.target.parentNode.reset()
    }


    render() {
        return (
            <div className={'border rounded border-white p-4 m-2 ' + this.props.className} >
                <form>
                    {this.props.title ?
                        <>
                            <h3>{this.props.title}</h3>
                            <div className='form-group'>
                                <label htmlFor='title'>Accounts Title</label>
                                <input className='form-control' type='text' name='title' onChange={this.handleChange} placeholder='Add title here'/>
                            </div>
                        </>
                        : null}

                    <div className='form-group'>
                        <label htmlFor='balance'>Balance</label>
                        <input className='form-control' type='number' name='balance' onChange={this.handleChange} placeholder='Add balance here'/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='limit'>Budget Limit</label>
                        <input className='form-control' type='number' name='limit' onChange={this.handleChange} placeholder='Add limit here'/>
                    </div>

                    <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}>Add</button>
                </form>

            </div>
        )
    }
}

export default AccountsForm

