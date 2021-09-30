import React from 'react'

import MultiSelectComponent from './multiSelect'

import API from '../../API'
import { FRIEND_LIST_URL } from '../../Config'
import { getRandomColor } from '../Charts/Utils/chartUtils'

class SplitTransactionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            total_amount: 0,
            users_in_split: [],
            category: 1,
            creator: localStorage.getItem('userid')
        }
    }

    promiseFriends = (inputValue) => new Promise((resolve, reject) => {
        const url = FRIEND_LIST_URL + `?search=${inputValue}`
        API.fetchFriendsList(url).then(friendResult => {

            const friends = friendResult.results.map((friend) => {
                return { value: friend.id, label: friend.username, color: getRandomColor() }
            })

            resolve(friends)
        })
    })

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const res = await API.createSplitTransaction(this.state)
        if (res.status === 201){
            alert("Expense Splitted");
            event.target.parentNode.parentNode.reset();
            this.props.splitHandler();
        }
    }

    render() {
        return (
            <div className={'border rounded border-white p-4 m-2 ' + this.props.className} >
                <form>
                    <h3> Split with Friends </h3>
                    <div className='form-group'>
                        <label htmlFor='title'>Title</label>
                        <input
                            type='text'
                            name='title'
                            className='form-control'
                            placeholder='Add title here'
                            onChange={(event) => { this.handleChange(event.target.name, event.target.value) }}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='total-amount'>Total Amount</label>
                        <input
                            type='number'
                            name='total_amount'
                            className='form-control'
                            placeholder='Add total amount here'
                            onChange={(event) => { this.handleChange(event.target.name, event.target.value) }}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='category'>Category</label>
                        <select
                            className='custom-select'
                            name='category'
                            onChange={(event) => { this.handleChange(event.target.name, event.target.value) }}
                        >
                            {
                                this.props.categories.map((category) => {
                                    const option = category[1] !== 'Income' ? <option key={category[0]} value={category[0]}>{category[1]}</option> : null
                                    return option;
                                }
                                )
                            }
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='friends'>Friends</label>
                        <MultiSelectComponent
                            promiseOptions={this.promiseFriends}
                            handleChange={this.handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}>Create</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SplitTransactionForm