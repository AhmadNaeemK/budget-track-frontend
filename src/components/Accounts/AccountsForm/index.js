import React from 'react'

import API from '../../../API';

class AccountsForm extends React.Component {

    initialState = {
        title: '',
        balance: 0,
        limit: 0,
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
        if (this.props.type === "creation") {
            const res = await API.createCashAccount(this.state);
            if (res && res.status === 201) {
                this.setState(this.initialState)
                const account = await res.json()
                this.props.accountHandler(account)
            } else {
                const error = await res.json()
                alert(error[Object.keys(error)[0]])
            }
        } else {
            let newState = {};
            for (let s in this.state) {
                if (this.state[s] !== '' && this.state[s] !== 0) newState = { ...newState, [s]: this.state[s] }
            }
            const res = await API.updateCashAccount(this.props.account_edit.id, newState)
            if (res.status === 200) {
                const updatedAccount = await res.json()
                this.props.accountHandler(updatedAccount)
                this.setState(this.initialState)
            } else {
                const error = await res.json()
                alert(error[Object.keys(error)[0]])
            }
        }
        this.setState(this.initialState)
    }


    render() {
        return (
            <form>
                {this.props.type === 'creation' ?
                    <>
                        <div className='mb-3'>
                            <label htmlFor='title'>Accounts Title</label>
                            <input className='form-control' type='text' value={this.state.title} name='title' onChange={this.handleChange} placeholder='Add title here' />
                        </div>
                    </>
                    : null}

                <div className='mb-3'>
                    <label htmlFor='balance'>Balance</label>
                    <input className='form-control' value={this.state.balance} type='number' name='balance' onChange={this.handleChange} placeholder='Add balance here' />
                </div>

                <div className='mb-3'>
                    <label htmlFor='limit'>Budget Limit</label>
                    <input className='form-control' value={this.state.limit} type='number' name='limit' onChange={this.handleChange} placeholder='Add limit here' />
                </div>

                <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}>Add</button>
            </form>
        )
    }
}

export default AccountsForm

