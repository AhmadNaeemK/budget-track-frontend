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

    categories = []

    componentDidMount= () => {
        (async () => {
        const categories = await API.fetchAccountCategories();
        this.categories = categories
        if (this.props.title == 'Create Accounts'){
            this.setState({category: this.categories[0][0]})
            this.initialState.category = this.categories[0][0]
        }
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
                this.props.accountHandler()
                this.setState(this.initialState)
            }
        } else {
            let newState = {'accountId': this.props.accountId}
            for (let s in cleanState){
                if (cleanState[s] !== '') newState = {...newState, [s]: this.state[s]}
            }
            const res = await API.updateAccount(newState);
            if (res && res.status === 202){
                this.props.accountHandler()
                this.setState(this.initialState)
            }
        }
        event.target.parentNode.reset()
    }
    

    render () {
        return (
        <div className={'border rounded border-white p-4 m-2 ' + this.props.className} >
            <form>
                {this.props.title? <h3>{this.props.title}</h3>: null }

                <label htmlFor='title'>Accounts Title</label>
                <input className='form-control' type='text' name='title' onChange={this.handleChange}/>

                <label htmlFor='category'>Category</label>
                <select className='form-select' type='text' name='category' onChange={this.handleChange}>
                    {this.categories.map((category, index) => (
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

