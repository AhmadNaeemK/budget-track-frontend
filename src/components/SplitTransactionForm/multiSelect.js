import chroma from 'chroma-js'
import React from 'react'

import AsyncSelect from 'react-select/async'

class MultiSelectComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: "",
        }
    }

    handleSelectChange = (value) => {
        this.props.handleChange('users_in_split', value.map((obj => obj.value)))
    }

    multiSelectStyle = {
        option: (provided, state) => ({
            ...provided,
            color: 'black'
        }),

        multiValue: (styles, { data }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: color.alpha(0.1).css(),
            };
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: data.color,
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: data.color,
            ':hover': {
                backgroundColor: data.color,
                color: 'white',
            },
        }),
    }

    render() {
        return (
            <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions
                loadOptions={this.props.promiseOptions}
                styles={this.multiSelectStyle}
                onChange={this.handleSelectChange}
            />
        )
    }
}

export default MultiSelectComponent