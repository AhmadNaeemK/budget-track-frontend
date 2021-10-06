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
                this.props.accountHandler()
                this.setState(this.initialState)
            } else {
                const error = await res.json()
                alert(error[Object.keys(error)[0]])
            }
        } else {
            let newState = {};
            for (let s in this.state) {
                if (this.state[s] !== '' && this.state[s] !== 0) newState = { ...newState, [s]: this.state[s] }
            }
            const res = await API.updateCashAccount(this.props.accountId, newState)
            if (res.status === 200) {
                this.props.accountHandler()
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
                    {this.props.type === 'creation' ?
                        <>
                            <div className='mb-3'>
                                <label htmlFor='title'>Accounts Title</label>
                                <input className='form-control' type='text' name='title' onChange={this.handleChange} placeholder='Add title here'/>
                            </div>
                        </>
                        : null}

                    <div className='mb-3'>
                        <label htmlFor='balance'>Balance</label>
                        <input className='form-control' type='number' name='balance' onChange={this.handleChange} placeholder='Add balance here'/>
                    </div>

                    <div className='mb-3'>
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

