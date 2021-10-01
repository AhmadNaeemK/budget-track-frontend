import React from 'react'

class UserSearchBar extends React.Component {

    onClear = (event) => {
        const s = event.target.parentNode.parentNode
        this.props.handleClear()
        s.reset()
    }

    onSearch = (event) => {
        this.props.handleSearch(event.target.value)
    }

    render() {
        return (
            <div className='col-4'>
            <div className='input-group mb-3'>
                <input className="form-control" type='text' placeholder='Search by Name' onChange={this.onSearch} />
                <button type='button' className='btn btn-primary' onClick={this.onClear}> X </button>
            </div>
            </div>
        )
    }
}

export default UserSearchBar;