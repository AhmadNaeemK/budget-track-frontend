import React from 'react'

import MultiSelectComponent from './multiSelect'
import AsyncSelect from 'react-select/async'

import API from '../../../API'
import { FRIEND_LIST_URL } from '../../../Config'
import { getRandomColor } from '../../Charts&Tables/Utils/chartUtils'

class SplitTransactionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            total_amount: 0,
            creator: localStorage.getItem('userid'),
            category: 1,
            paying_friend: null,
            all_friends_involved: []
        }
    }

    promiseFriends = (inputValue) => new Promise((resolve, reject) => {
        const url = FRIEND_LIST_URL + `?search=${inputValue}`
        API.fetchFriendsList(url).then(friendResult => {

            const friends = friendResult.results.map((friend) => {
                return { value: friend.id, label: friend.username, color: getRandomColor() }
            })

            resolve(friends.concat([{ value: localStorage.getItem('userid'), label: localStorage.getItem('username'), color: getRandomColor() }]))
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
        if (res.status === 201) {
            alert("Expense Splitted");
            event.target.parentNode.parentNode.reset();
            window.location.reload()
        } else {
            const error = await res.json()
            alert(error[Object.keys(error)[0]])
        }
    }

    render() {
        return (
            <form>
                <div className='mb-3'>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        name='title'
                        className='form-control'
                        placeholder='Add title here'
                        onChange={(event) => { this.handleChange(event.target.name, event.target.value) }}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='total-amount'>Total Amount</label>
                    <input
                        type='number'
                        name='total_amount'
                        className='form-control'
                        placeholder='Add total amount here'
                        onChange={(event) => { this.handleChange(event.target.name, event.target.value) }}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='category'>Category</label>
                    <select
                        className='form-select'
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
                <div className='mb-3'>
                    <label htmlFor='paying_friend'>Who Payed?</label>
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        loadOptions={this.promiseFriends}
                        onChange={(value) => { this.handleChange('paying_friend', value.value) }}
                        styles={{
                            option: (provided, state) => ({
                                ...provided,
                                color: 'black'
                            }),
                        }}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='friends'>Friends Involved</label>
                    <MultiSelectComponent
                        promiseOptions={this.promiseFriends}
                        handleChange={this.handleChange}
                    />
                </div>
                <div className='mb-3'>
                    <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}>Create</button>
                </div>
            </form>
        )
    }
}

export default SplitTransactionForm