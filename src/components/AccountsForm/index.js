import React from 'react'

import API from '../../API'

class AccountsForm extends React.Component{

    initialState = {
        title: '',
        category: '',
    }

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    categories = {}

    componentDidMount(){
        (async () => {
        const categories = await API.fetchAccountCategories();
        this.categories = categories
        })();
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {categories, ...cleanState} = this.state;
        if (this.props.title === "Create Accounts"){
            const res = await API.createAccount(cleanState);
            if (res && res.status === 201){
                const newAccounts = await API.fetchAccount(false, false, true)
                console.log(newAccounts)
                this.props.accountHandler(newAccounts)
                this.setState(this.initialState)
            }
        } else {
            let newState = {'accountId': this.props.accountId}
            for (let s in cleanState){
                if (cleanState[s] !== '') newState = {...newState, [s]: this.state[s]}
            }
            const res = await API.updateAccount(newState);
            if (res && res.status === 202){
                const newTransactions = await API.fetchTransactions(false);
                const newAccounts = await API.fetchAccount(false,false,true);
                this.props.transactionAccountHandler(newTransactions, newAccounts)
                this.setState(this.initialState)
            }
        }
    }
    

    render () {
        return (
        <div className={'border rounded border-white p-4 m-2 ' + this.props.className} >
            <form>
                {this.props.title? <h3>{this.props.title}</h3>: null }

                <label for='title'>Accounts Title</label>
                <input className='form-control' type='text' name='title' onChange={this.handleChange}/>

                <label for='category'>Category</label>
                <select className='form-select' type='text' name='category' onChange={this.handleChange}>
                    {Object.entries(this.categories).map((category, index) => (
                        <option key={index} value={category[0]}> {category[1]} </option>
                    ))}
                </select>
                
                <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}>Add</button>
            </form>
            
        </div>
    )
    }
}

export default AccountsForm

