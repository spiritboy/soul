import React from 'react'
import PropTypes from "prop-types";

import Select from 'react-select/lib';
import {Source} from "../../model/Source";
import {_BaseField} from "./_BaseField";


export class SelectField extends _BaseField {
    state = {
        value: '',
        options:[]
    };
    componentWillMount(){
        let a_Sync_options = this.props.source.options;
        this.setState({options:a_Sync_options.evalSync()})
    }
    options=[] ;
    onValueChange = (selectedOption) => {
       this._onValueChange(selectedOption)
    };
    render() {
        return (
            <Select onBlur={this.onBlur}
                         onFocus={this.onFocus} cacheOptions
                         value={this.state.value}
                         onChange={this.onValueChange}
                         options={this.state.options}

            />
        )
    }
}

SelectField.propTypes = {
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