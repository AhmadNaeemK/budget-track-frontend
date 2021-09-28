import React from 'react'
import API from '../../API';

class SplitTransactionList extends React.Component {


    handleDelete = async (event) => {
        const splitId = parseInt(event.target.id.split(/del-btn-/)[1]);
        const res = await API.deleteSplitTransaction(splitId)
        if (res.status === 204) {
            this.props.splitHandler()
        }
    }

    handlePay = async (event) => {
        const splitId = parseInt(event.target.id.split(/pay-btn-/)[1]);
        const split = this.props.splitTransactions.find(split => split.id===splitId)
        const payable_amount = split.total_amount / split.users_in_split.length
        const data = {
            split_id: splitId,
            amount: payable_amount
        }
        const res = await API.paySplit(data)
        if (res.status=== 200){
            alert("Payment Succesful")
        }
    }

    render() {
        return (
            <table className='table table-dark table-striped'>

                <thead><tr><th className='bg-dark' colSpan='10'>{this.props.title}</th></tr></thead>
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Creator</th>
                        <th>Category</th>
                        <th>Users</th>
                        <th>Payed</th>
                        <th>Amount</th>
                        <th colSpan="2"></th>
                    </tr>
                    {this.props.splitTransactions.length > 0 ?
                        this.props.splitTransactions.map(split => (
                            <tr key={split.id}>
                                <td>{split.id}</td>
                                <td>{split.title}</td>
                                <td>{split.creator}</td>
                                <td>{split.category}</td>
                                <td>
                                    <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
                                        {split.users_in_split.map((user, index) => (
                                            <li key={user[0]}>{user[1]}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
                                        {split.payed_users.map((user, index) => (
                                            <li key={user[0]}>{user[1]}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{split.total_amount}</td>
                                <td>
                                    {this.props.splitType === 'created' ?
                                        <button id={`del-btn-${split.id}`} className='btn btn-outline-danger' onClick={this.handleDelete}>
                                            <i id={`del-btn-${split.id}`} className='fas fa-trash-alt'></i>
                                        </button> :
                                        <button id={`pay-btn-${split.id}`} className='btn btn-outline-success' onClick={this.handlePay}>
                                            <i id={`pay-btn-${split.id}`} className='fas fa-check'></i>
                                        </button>

                                    }

                                </td>
                            </tr>
                        )) :
                        <td colSpan='10'>No Splits Found</td>
                    }
                </tbody>
            </table>
        )
    }
}

export default SplitTransactionList;