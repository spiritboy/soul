import React from 'react'
import PropTypes from "prop-types";
import {_BaseField} from "./_BaseField";

export class DateField extends _BaseField{
    state = {
        value: ''
    };
    componentWillMount() {
        this.setState({value: this.props.value == null ? '' : this.props.value.toString()})
    }

    componentWillReceiveProps(nextProps) {
        var newVal = nextProps.value == null ? '' : nextProps.value.toString();
        this.setState({value: newVal})
    }
    onValueChange = (e) => {
        this._onValueChange(e.target.value)
    };

    render() {
        return (
            <input onBlur={this.onBlur} onFocus={this.onFocus} type={"date"} value={this.state.value} onChange={this.onValueChange} className={"form-control"}/>
        )
    }
}

DateField.propTypes = {
    onValueChanged: PropTypes.func,
    onValueChanging: PropTypes.func,
    onShouldChangeValue:PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onCancelEdit: PropTypes.func,
    value: PropTypes.string
}