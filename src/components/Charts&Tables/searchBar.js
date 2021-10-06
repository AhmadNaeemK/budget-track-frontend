import React from 'react'

class SearchBar extends React.Component {

    onClear = (event) => {
        const form = event.target.parentNode.parentNode
        this.props.handleClear()
        form.reset()
    }

    onSearch = (event) => {
        this.props.handleSearch(event.target.value)
    }

    render() {
        return (
            <div className='col-4'>
                <form>
                    <div className='input-group mb-3'>
                        <input className="form-control" type='text' placeholder='Search' onChange={this.onSearch} />
                        <button type='button' className='btn btn-primary' onClick={this.onClear}> X </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBar;