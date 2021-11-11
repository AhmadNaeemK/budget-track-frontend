import React from 'react'
import { connect } from 'react-redux';

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

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.setState({
                balance: this.props.account_edit.balance,
                limit: this.props.account_edit.limit
            })
        }
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
                this.props.createAccount(account)
            } else {
                const error = await res.json()
                alert(error[Object.keys(error)[0]])
            }
        } else {
            let formData = {balance: this.state.balance, limit: this.state.limit};
            const res = await API.updateCashAccount(this.props.account_edit.id, formData)
            if (res.status === 200) {
                const updatedAccount = await res.json()
                this.props.updateAccount(updatedAccount)
                if(this.props.isResultSuccesful){
                    this.props.isResultSuccesful(true)
                }
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

                <button type='submit' className='btn primaryBtn' onClick={this.handleSubmit} data-bs-dismiss={!this.isResultSuccesful? null: "modal"}>Add</button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    createAccount: (account) => {
        dispatch({
            type: 'account/createAccount',
            payload: account
        })
    },
    updateAccount: (account) => {
        dispatch({
            type: 'account/updateAccount',
            payload: account
        })
    }
})

export default connect(null, mapDispatchToProps)(AccountsForm)

