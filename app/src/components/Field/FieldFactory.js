import React from 'react'
import PropTypes from "prop-types";
import {TextField} from "./TextField";
import {DateField} from "./DateField";
import {SelectField} from "./SelectField";
import {QuestionValue} from "../../model/GroupValue";

export class FieldFactory extends React.Component {
    constructor(props){
        super(props);
        this.field = React.createRef();
    }
    field;
    onShouldChangeValue = (newValue) => {
        this.field.current.onShouldChangeValue(newValue);
    }

    render() {
        var {questionValue, onValueChanging, onValueChanged, onExited, onExiting, onEntered, onEntering} = this.props;
        let field = null;
        if (questionValue.question.fieldInfo.type === 'text')
            field = <TextField ref={this.field} onEntered={onEntered} onEntering={onEntering} onExited={onExited} onExiting={onExiting}
                               onValueChanged={onValueChanged} onValueChanging={onValueChanging} value={questionValue.value}
            />
        else if (questionValue.question.fieldInfo.type === 'date')
            field = <DateField ref={this.field} onEntered={onEntered} onEntering={onEntering} onExited={onExited} onExiting={onExiting}
                               onValueChanged={onValueChanged} onValueChanging={onValueChanging} value={questionValue.value}
            />
        else if (questionValue.question.fieldInfo.type === 'select')
            field = <SelectField ref={this.field} onEntered={onEntered} onEntering={onEntering} onExited={onExited} onExiting={onExiting}
                                 source={questionValue.question.fieldInfo.source} onValueChanged={onValueChanged}
                                 onValueChanging={onValueChanging} value={questionValue.value}
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