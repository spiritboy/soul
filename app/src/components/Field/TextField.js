import React from 'react'
import PropTypes from "prop-types";
import {_BaseField} from "./_BaseField";

export class TextField extends _BaseField {
    state = {
        value: this.props.value == null ? '' : this.props.value
    };
    onValueChanged = (e) => {
        this._onValueChange(e.target.value)
    };

    render() {
        return (
            <input onBlur={this.onBlur} onFocus={this.onFocus} value={this.state.value} onChange={this.onValueChanged}
                   className={"form-control"}/>
        )
    }
}

TextField.propTypes = {
    onValueChanged: PropTypes.func,
    onValueChanging: PropTypes.func,
    onShouldChangeValue: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    value: PropTypes.string
}