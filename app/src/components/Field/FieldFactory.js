import React from 'react'
import PropTypes from "prop-types";
import {TextField} from "./TextField";
import {DateField} from "./DateField";
import {AsyncSelectField} from "./AsyncSelectField";
import {SelectField} from "./SelectField";
import {QuestionValue} from "../../model/GroupValue";

export class FieldFactory extends React.Component {
    state = {questionValue: null}

    constructor(props) {
        super(props);
        this.field = React.createRef();
    }

    field;
    onShouldChangeValue = (newValue) => {
        this.field.current.onShouldChangeValue(newValue);
    }

    componentWillMount() {
        this.setState({questionValue: this.props.questionValue})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({questionValue: nextProps.questionValue})
    }

    render() {
        var {onValueChanging, onValueChanged, onExited, onExiting, onEntered, onEntering} = this.props;
        let field = null;
        if (this.state.questionValue.question.fieldInfo.type === 'text')
            field = <TextField ref={this.field} onEntered={onEntered} onEntering={onEntering} onExited={onExited}
                               onExiting={onExiting}
                               onValueChanged={onValueChanged} onValueChanging={onValueChanging}
                               value={this.state.questionValue.value}
            />
        else if (this.state.questionValue.question.fieldInfo.type === 'date')
            field = <DateField ref={this.field} onEntered={onEntered} onEntering={onEntering} onExited={onExited}
                               onExiting={onExiting}
                               onValueChanged={onValueChanged} onValueChanging={onValueChanging}
                               value={this.state.questionValue.value}
            />
        else if (this.state.questionValue.question.fieldInfo.type === 'asyncSelect')
            field = <AsyncSelectField ref={this.field} onEntered={onEntered} onEntering={onEntering} onExited={onExited}
                                      onExiting={onExiting}
                                      source={this.state.questionValue.question.fieldInfo.source} onValueChanged={onValueChanged}
                                      onValueChanging={onValueChanging} value={this.state.questionValue.value}
            />
        else if (this.state.questionValue.question.fieldInfo.type === 'select')
            field = <SelectField ref={this.field} onEntered={onEntered} onEntering={onEntering} onExited={onExited}
                                      onExiting={onExiting}
                                      source={this.state.questionValue.question.fieldInfo.source} onValueChanged={onValueChanged}
                                      onValueChanging={onValueChanging} value={this.state.questionValue.value}
            />
        return field;

    }
}

FieldFactory.propTypes = {
    questionValue: PropTypes.instanceOf(QuestionValue),
    onValueChanged: PropTypes.func,
    onValueChanging: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func,
    value: PropTypes.string
}