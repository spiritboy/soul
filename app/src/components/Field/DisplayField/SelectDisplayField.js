import React from 'react'
import PropTypes from "prop-types";
import {Source} from "../../../model/Source";

export class SelectDisplayField extends React.Component {
    state = {
        value: null,
        label: ''
    };

    componentWillMount() {
         this.prepareProps(this.props.value)
    }

    onShouldChangeValue = (newValue) => {
        if (this.state.value !== newValue) {
            this.setState({value: newValue});
        }
    };

    componentWillReceiveProps(nextProps) {
        var newVal = nextProps.value == null ? '' : nextProps.value.toString();
        this.prepareProps(newVal)
    }

    prepareProps(value){
        let val = value == null ? '' : value
        if (val != null) {
            this.props.source.options.eval((d) => {
                let selectedItem = d.find(item => item.value === val)
                this.setState({
                    label: selectedItem!=null ? selectedItem.label : null, value: selectedItem!=null ? selectedItem.value : null
                });
            }, {key: '{filter}', value: val})
        }
        else {
            this.setState({
                label: null, value: null
            });
        }
    }
    render() {
        return (
            <span>{this.state.label}</span>
        )
    }
}

SelectDisplayField.propTypes = {
    source: PropTypes.instanceOf(Source),
    value: PropTypes.string
}