import React from 'react'
import API from '../../API';
import BaseDataTableComponent from '../Charts&Tables/BaseDataTableComponent';
import { categoryColor } from '../Charts&Tables/Utils/chartUtils';

class MaxSplitData extends React.Component {
    columns = []
    constructor(props) {
        super(props);
        this.columns = [
            {
                name: 'Title',
                id: 'title',
                selector: row => row.split.title
            },
            {
                name: 'Friend',
                id: 'friend',
                selector: row => row.split.paying_friend.username
            },
            {
                name: 'Payable Amount',
                id: 'payable_amount',
                selector: row => row.payable_amount
            },
        ]
    }

    dataRequest = async (params) => {
        const res = await API.fetchMaxSplitsDue()
        return res
    }

    conditionalRows = [
        {
            when:  row => row.payable_amount === 0 ,
            style: {
                backgroundColor: categoryColor['Healthcare'],
            },
        },
        {
            when:  row => row.payable_amount > 0 ,
            style: {
                backgroundColor: categoryColor['Grocery'],
            },
        }
    ]

    render() {
        return (
            <>
                <BaseDataTableComponent
                    columns={this.columns}
                    fetchDataRequest={this.dataRequest}
                    conditionalRowStyles={this.conditionalRows}
                    setMethods={() => {}}
                />
            </>
        )
    }
}

export default MaxSplitData;