import React from 'react'
import PropTypes from "prop-types";

import AsyncSelect from 'react-select/lib/Async';
import {Source} from "../../model/Source";
import {_BaseField} from "./_BaseField";


export class AsyncSelectField extends _BaseField {
    state = {
        value: ''
    };
    loadOptions = (inputValue, callback) => {
        let a_Sync_options = this.props.source.options;
        a_Sync_options.eval(callback, {key: '{filter}', value: inputValue})
    };
    onValueChange = (selectedOption) => {
       this._onValueChange(selectedOption)
    };
    render() {
        return (
            <AsyncSelect onBlur={this.onBlur}
                         onFocus={this.onFocus} cacheOptions
                         value={this.state.value}
                         onChange={this.onValueChange}
                         loadOptions={this.loadOptions}

            />
        )
    }
}

AsyncSelectField.propTypes = {
    onValueChanged: PropTypes.func,
    onValueChanging: PropTypes.func,
    onShouldChangeValue: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    source: PropTypes.instanceOf(Source),
    value: PropTypes.string
}