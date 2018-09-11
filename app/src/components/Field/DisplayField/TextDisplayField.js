import React from 'react'
import PropTypes from "prop-types";

export class TextDisplayField extends React.Component {
    state = {
        value: this.props.value == null ? '' : this.props.value,
    };
    onShouldChangeValue = (newValue) => {
        if (this.state.value !== newValue) {
            this.setState({value: newValue});
        }
    };
    componentWillReceiveProps(nextProps) {
        var newVal = nextProps.value == null ? '' : nextProps.value.toString();
        this.setState({value: newVal})
    }
    render(){
        return(
            <span>{this.state.value}</span>
        )
    }
}
TextDisplayField.propTypes = {
    value: PropTypes.string
}