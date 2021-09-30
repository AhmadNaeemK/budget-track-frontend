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

    render() { return (
        <form className='row'>
            <div className='col-8 ml-auto'>
            <input className="form-control" type='text' placeholder='Search by Name' onChange={this.onSearch} />
            </div>

            <div className='col ml-auto'>
            <button type='button' className='btn btn-primary' onClick={this.onClear}> X </button>
            </div>
        </form>
    )}
}

export default UserSearchBar;