/* global $*/
import React from "react";

export class _BaseField extends React.Component {
    onShouldChangeValue = (newValue) => {
        if (this.state.value !== newValue) {
            this.setState({value: newValue});
        }
    };
    onFocus = (e) => {
        let valid = true;
        if (this.props.onEntering)
            valid = this.props.onEntering();
        if (valid) {
            if (this.props.onEntered)
                this.props.onEntered();
        } else {
            var inputs = $(e.target).closest('form').find(':input');
            inputs.eq(inputs.index(e.target) + 1).focus();
        }
    };
    onBlur = (e) => {
        let valid = true;
        if (this.props.onExiting)
            valid = this.props.onExiting();
        if (valid) {
            if (this.props.onExited)
                this.props.onExited();
        } else
            e.target.focus()
    };
    _onValueChange = (newValue) => {
        let prevValue = this.state.value;
        let valid = true;
        if (this.props.onValueChanging)
            valid = this.props.onValueChanging(prevValue, newValue);
        if (valid) {
            this.setState({value: newValue});
            if (this.props.onValueChanged)
                this.props.onValueChanged(prevValue, newValue);
        }
    };
    cancelEdit=()=>{
        this.props.onCancelEdit();
    }
}