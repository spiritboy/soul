import React from 'react'
import PropTypes from "prop-types";
import {TextField} from "./TextField";
import {Question} from "../../model/Question";
import {DateField} from "./DateField";
import {SelectField} from "./SelectField";

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
        var {question, onValueChanging, onValueChanged, onExited, onExiting, onEntered, onEntering} = this.props;
        let field = null;
        if (question.fieldInfo.type === 'text')
            field = <TextField ref={this.field} onEntered={onEntered} onEntering={onEntering} onExited={onExited} onExiting={onExiting}
                               onValueChanged={onValueChanged} onValueChanging={onValueChanging} value={question.value}
            />
        else if (question.fieldInfo.type === 'date')
            field = <DateField ref={this.field} onEntered={onEntered} onEntering={onEntering} onExited={onExited} onExiting={onExiting}
                               onValueChanged={onValueChanged} onValueChanging={onValueChanging} value={question.value}
            />
        else if (question.fieldInfo.type === 'select')
            field = <SelectField ref={this.field} onEntered={onEntered} onEntering={onEntering} onExited={onExited} onExiting={onExiting}
                                 source={question.fieldInfo.source} onValueChanged={onValueChanged}
                                 onValueChanging={onValueChanging} value={question.value}
            />
        return field;

    }
}

FieldFactory.propTypes = {
    question: PropTypes.instanceOf(Question),
    onValueChanged: PropTypes.func,
    onValueChanging: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func,
    value: PropTypes.string
}