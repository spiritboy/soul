import React from 'react'
import PropTypes from 'prop-types';
import {FieldFactory} from "../Field/FieldFactory";
import {QuestionValue} from "../../model/GroupValue";

export class QuestionComponent extends React.Component {
    constructor(props) {
        super(props);
        props.questionValue.eventOnValueChanged.push(this.onQuestionValueChanged);
        props.questionValue.question.forceUpdate = this.onQuestionForceUpdate;
        this.fieldFactory = React.createRef();
    }

    componentWillMount() {
        this.setState({
            questionValue: this.props.questionValue,
            isValid: this.props.questionValue.isValid
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            questionValue: nextProps.questionValue,
            isValid: this.props.questionValue.isValid
        })
        if (nextProps.questionValue.eventOnValueChanged.length === 0)
            nextProps.questionValue.eventOnValueChanged.push(this.onQuestionValueChanged)
        if (nextProps.questionValue.eventOnValidChanged.length === 0)
            nextProps.questionValue.eventOnValidChanged.push(this.onValidChanged)

    }

    render() {
        return (
            <div>
                <div className={"form-group" + (this.state.isValid?"":" invalid")}>
                    <label className={"control-label"}>
                        {this.state.questionValue.question.title}
                        <span style={{color: 'red'}} hidden={this.state.isValid}>*</span>
                    </label>
                    <FieldFactory ref={this.fieldFactory} onValueChanged={this.onValueChanged}
                                  onValueChanging={this.onValueChanging}
                                  onQuestionValueChanged={this.onQuestionValueChanged}
                                  onEntering={this.onEntering}
                                  onEntered={this.onEntered}
                                  onExiting={this.onExiting}
                                  onExited={this.onExited}
                                  onCancelEdit={this.onCancelEdit}
                                  questionValue={this.state.questionValue}/>
                </div>
            </div>
        )
    };

    onQuestionForceUpdate = () => {
        this.forceUpdate();
    };
    onValidChanged = () => {
        this.setState({isValid: this.props.questionValue.isValid})
    };
    onQuestionValueChanged = (newValue) => {
        this.fieldFactory.current.onShouldChangeValue(newValue)
    };
    onValueChanging = (prevValue, newValue) => {
        return true;
    };
    onValueChanged = (prevValue, newValue) => {
        this.props.questionValue.value = newValue;
    };
    onExiting = () => {
        this.props.questionValue.checkValidation();
        var valid = null;
        if (this.props.questionValue.question.events.onExiting != null)
            valid = this.props.questionValue.question.events.onExiting.evalSync();
        return valid == null ? true : valid;
    };
    onExited = () => {
        if (this.props.questionValue.question.events.onExited != null)
            this.props.questionValue.question.events.onExited.evalSync();
    };
    onEntering = () => {
        var valid = null;
        if (this.props.questionValue.question.events.onEntering != null)
            valid = this.props.questionValue.question.events.onEntering.evalSync();
        return valid == null ? true : valid;
    };
    onEntered = () => {
        if (this.props.questionValue.question.events.onEntered != null)
            this.props.questionValue.question.events.onEntered.evalSync();
    };
    onCancelEdit = () => {
        this.props.questionValue.rollbackValue();
    };
}

QuestionComponent.propTypes = {
    questionValue: PropTypes.instanceOf(QuestionValue).isRequired
};
