import React from 'react'

import SearchBar from './searchBar';

import DataTable from 'react-data-table-component';

class BaseDataTableComponent extends React.Component {

    customStyles = {
        tableWrapper: {
            border: '2px',
            borderRadius: '20%',
        },
        rows: {
            style: {
                minHeight: '72px', // override the row height
            },
        },
        headCells: {
            style: {
                margin: 'auto',
                justifyContent: 'center',
            },
        },
        cells: {
            style: {
                padding: '2px', // override the cell padding for data cells
                marginLeft: '2px',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
            },
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            totalRows: 0,
            isLoaded: false,
            pageSize: 5,
            currentPage: 1,
            searchTerm: '',
            sort_field: '',
        }
    }

    loadResults = async (page, searchTerm, pageSize, sortField) => {
        const params = `?page=${page}` +
            `&page_size=${pageSize}` +
            `&search=${searchTerm}` +
            `&ordering=${sortField}`
        const dataList = await this.props.fetchDataRequest(params);
        if (page !== 1) {
            this.setState({ data: dataList.results, totalRows: dataList.count })
        } else {
            this.setState({ data: dataList.results })
        }
    }

    changePage = (page, totalRows) => {
        this.setState({ isLoaded: false, currentPage: page });
        this.loadResults(page, this.state.searchTerm, this.state.pageSize, this.state.sort_field)
            .then(() => { this.setState({ isLoaded: true }) })
    }

    changePageSize = (currentRowsPerPage, currentPage) => {
        this.setState({ pageSize: currentRowsPerPage })
        this.loadResults(1, this.state.searchTerm, currentRowsPerPage, this.state.sort_field)
    }

    changeSortField = (column, direction) => {
        const dir = direction === 'desc' ? '-' : ''
        const sort_field = dir + column.id
        this.setState({ sort_field: sort_field })
        this.loadResults(this.state.currentPage, this.state.searchTerm, this.state.pageSize, sort_field)
    }

    componentDidMount() {
        this.props.setMethods(this.changeData, this.getData)
        this.loadResults(1, this.state.searchTerm, this.state.pageSize, this.state.sort_field)
            .then(() => { this.setState({ isLoaded: true }) })
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.loadResults(1, this.state.searchTerm, this.state.pageSize, this.state.sort_field)
                .then(() => { this.setState({ isLoaded: true }) })
        }
    }

    subHeaderCreator() {
        const handleClear = async () => {
            this.setState({ searchTerm: "" })
            this.loadResults(1, "", this.state.pageSize);
        }

        const handleSearch = (searchTerm) => {
            this.setState({ searchTerm: searchTerm })
            this.loadResults(1, searchTerm, this.state.pageSize)
        }

        return <SearchBar handleClear={handleClear} handleSearch={handleSearch} />
    }

    changeData = (newData) => {
        this.setState({
            data: newData
        })
    }

    getData = () => {
        return this.state.data
    }

    render() {
        return (
            <DataTable
                theme='dark'
                striped={true}
                columns={this.props.columns}
                data={this.state.data}
                pagination={this.props.paginated}
                onChangePage={(page, totalRows) => {
                    this.changePage(page, totalRows)
                }}
                onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
                    this.changePageSize(currentRowsPerPage, this.changePage)
                }}
                paginationServer={true}
                paginationPerPage={this.state.pageSize}
                paginationTotalRows={this.state.totalRows}
                customStyles={this.customStyles}
                title={this.props.title}
                subHeader={this.props.searchAble}
                subHeaderComponent={this.subHeaderCreator()}
                sortServer
                onSort={this.changeSortField}
                conditionalRowStyles={this.props.conditionalRowStyles}
            />
        )
    }
}

export default BaseDataTableComponent;