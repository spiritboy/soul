import React from 'react'
import PropTypes from "prop-types";

import AsyncSelect from 'react-select/lib/Async';
import {Source} from "../../model/Source";
import {_BaseField} from "./_BaseField";


export class AsyncSelectField extends _BaseField {
    state = {
        internalValue: null,
        value: ''
    };
    loadOptions = (inputValue, callback) => {
        let a_Sync_options = this.props.source.options;
        a_Sync_options.eval(callback, {key: '{filter}', value: inputValue})
    };
    onValueChange = (selectedOption) => {
        //this will set the question value to _id
        this._onValueChange(selectedOption._id);
        //this is for the select field
        this.setState({internalValue: selectedOption})
    };
    componentWillMount(){
        var newVal = this.props.value == null ? '' : this.props.value.toString();
        this.prepareProps(newVal);
    }
    componentWillReceiveProps(nextProps) {
        var newVal = nextProps.value == null ? '' : nextProps.value.toString();
        this.prepareProps(newVal);
    }
    prepareProps(newVal){
        //this is for the question value
        this.setState({value: newVal})
        //this is for the select field
        if (newVal != null && newVal!==''){
            this.props.source.options.eval((d) => {
                this.setState({
                    internalValue: {label: d[0].label, value: d[0].value}
                });
            }, {key: '{filter}', value: newVal})
        }
        else {
            this.setState({
                internalValue: null
            });
        }
    }

    render() {
        return (
            <AsyncSelect onBlur={this.onBlur}
                         onFocus={this.onFocus} cacheOptions
                         value={this.state.internalValue}
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