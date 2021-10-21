import React from 'react'
import DataTable from 'react-data-table-component';

import API from '../API'
import { categoryColor } from './Charts&Tables/Utils/chartUtils';
import { customStyles } from './Charts&Tables/Utils/tableStyles';

import ModalComponent from './Modals';
import PaySplitForm from './SplitExpenseData/PaySplitForm';

class SplitTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paying_split: null,
            edit_split: null
        }
        this.columns = [{
            name: 'Title',
            id: 'title',
            selector: row => row.title,
            wrap: true,
        },
        {
            name: 'Category',
            id: 'Category',
            selector: row => row.category[1],
            wrap: true,
        },
        {
            name: 'Total Amount',
            id: 'total_amount',
            selector: row => row.total_amount,
            conditionalCellStyles: [
                {
                    when: row => row.paying_friend.username === localStorage.getItem('username'),
                    style: {
                        color: categoryColor['Healthcare'],
                    },
                },
                {
                    when: row => row.paying_friend.username !== localStorage.getItem('username'),
                    style: {
                        color: categoryColor['Grocery'],
                    },
                }
            ]
        },
        {
            name: 'Creator',
            id: 'creator',
            selector: row => row.creator.username,
        },
        {
            name: 'Paying Friend',
            id: 'paying_friend',
            selector: row => row.paying_friend.username,
        },
        {
            name: 'Actions',
            button: true,
            minWidth: '15%',
            left: true,
            style: {
                justifyContent: 'start'
            },
            cell: (row) => <div className='d-flex'>
                {localStorage.getItem('username') === row.creator.username &&
                    <div className='m-1'>
                        <button type="button" className='btn btn-outline-danger' onClick={() => this.deleteSplit(row)}>
                            <i className='fa fa-trash' />
                        </button>
                    </div>
                }
                {row.paying_friend.username !== localStorage.getItem('username') &&
                    <div className='m-1'>
                        <button type="button"
                            className='btn btn-outline-success'
                            data-bs-toggle='modal'
                            data-bs-target='#splitPaymentModal'
                            onClick={() => this.handlePaySplit(row)}
                        >
                            <i className='fa fa-usd' />
                        </button>
                    </div>
                }
            </div>
            ,
        },
        ]
    }

    handlePaySplit = (row) => {
        this.setState({
            paying_split: row
        })
    }


    deleteSplit = async (row) => {
        const res = await API.deleteSplitTransaction(row.id)
        if (res.status === 204) {
            window.location.href = '/splitExpenses'
        } else {
            alert(await res.json())
        }
    }

    render() {
        return (
            <>
                <DataTable
                    theme='dark'
                    striped={true}
                    columns={this.columns}
                    data={this.props.split}
                    pagination={false}
                    customStyles={customStyles}
                    title="Split Expense"
                />
                <ModalComponent
                    id='splitPaymentModal'
                    title='Pay the Split'
                    modalBody={
                        <PaySplitForm
                            split={this.state.paying_split}
                            updateTable={this.props.updateTable}
                        />
                    }
                />
            </>
        )
    }
}

class FriendsInvolvedTable extends React.Component {

    columns = [
        {
            name: 'Friend',
            id: 'friend',
            selector: row => row.username,
        },
        {
            name: 'Payable Amount',
            id: 'payable_amount',
            selector: row => row.payable,
            sortable: true,
        },
        {
            name: 'Paid Amount',
            id: 'paid_amount',
            selector: row => row.paid,
            sortable: true,
        }
    ]

    constructor(props) {
        super(props);
        this.state = {
            data: props.friends_involved
        }
    }

    static getDerivedStateFromProps(props, state) {
        state = {
            data: props.friends_involved
        }
        return state
    }

    render() {
        return (
            <DataTable
                theme='dark'
                striped={true}
                columns={this.columns}
                data={this.state.data}
                pagination={false}
                customStyles={customStyles}
            />
        )
    }
}


class SplitDetail extends React.Component {

    constructor(props) {
        super(props)
        this.splitId = this.props.match.params.splitId
        this.state = {
            split: {},
            isLoaded: false,
        }
    }

    componentDidMount() {
        const getSplit = async () => {
            const split = await API.fetchSplitTransaction(this.splitId);
            this.setState({ split: split });
        }

        getSplit().then(() => {
            this.setState({ isLoaded: true })
        })
    }

    updateAfterPayment = (updatedSplit) => {
        this.setState({
            split: updatedSplit
        })
    }

    render() {
        return (
            <div className='container'>
                {this.state.isLoaded &&
                    <>
                        <div className='row m-2'>
                            <div className='col'>
                                <SplitTable
                                    split={[this.state.split]}
                                    updateTable={this.updateAfterPayment}
                                />
                            </div>
                        </div>
                        <div className='row m-2'>
                            <div className='col'>
                                <FriendsInvolvedTable
                                    friends_involved={this.state.split.all_friends_involved}
                                />
                            </div>
                        </div>
                    </>
                }
            </div>
        )
    }
}


export default SplitDetail;