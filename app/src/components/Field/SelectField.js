import React from 'react'
import PropTypes from "prop-types";

import Select from 'react-select/lib';
import {Source} from "../../model/Source";
import {_BaseField} from "./_BaseField";


export class SelectField extends _BaseField {
    state = {
        internalValue: null,
        options: []
    };

    componentWillMount() {
        let a_Sync_options = this.props.source.options;
        this.setState({options: a_Sync_options.evalSync()})
    }

    options = [];
    onValueChange = (selectedOption) => {

        //this will set the question value to _id
        this._onValueChange(selectedOption._id == null ? '' : selectedOption._id.toString());
        //this is for the select field
        this.setState({internalValue: selectedOption})
    };

    componentWillReceiveProps(nextProps) {
        var newVal = nextProps.value == null ? '' : nextProps.value.toString();
        //this is for the question value
        this.setState({value: newVal})
        //this is for the select field
        var find = this.state.options.find(item => {
            return item._id.toString() === newVal
        });
        this.setState({
            internalValue: find ? find : null
        });
    }

    render() {
        return (
            <Select onBlur={this.onBlur}
                    onFocus={this.onFocus} cacheOptions
                    value={this.state.internalValue}
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
    onCancelEdit: PropTypes.func,
    source: PropTypes.instanceOf(Source),
    value: PropTypes.string
}