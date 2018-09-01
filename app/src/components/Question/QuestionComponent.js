import React from 'react'
import PropTypes from 'prop-types';
import {Question} from "../../model/Question";
import {FieldFactory} from "../Field/FieldFactory";

export class QuestionComponent extends React.Component {
    constructor(props) {
        super(props);
        props.question.onValueChanged.push(this.onQuestionValueChanged);
        props.question.forceUpdate =this.onQuestionForceUpdate;
        this.fieldFactory = React.createRef();
    }

    render() {
        return (
            <div>
                <div className={"form-group"}>
                    <label className={"control-label"}>{this.props.question.title}</label>
                    <FieldFactory ref={this.fieldFactory} onValueChanged={this.onValueChanged}
                                  onValueChanging={this.onValueChanging}
                                  onQuestionValueChanged={this.onQuestionValueChanged}
                                  onEntering={this.onEntering}
                                  onEntered={this.onEntered}
                                  onExiting={this.onExiting}
                                  onExited={this.onExited}
                                  question={this.props.question}/>
                </div>
            </div>
        )
    };
    onQuestionForceUpdate = () => {
        console.log(1)
        this.forceUpdate();
    };
    onQuestionValueChanged = (newValue) => {
        this.fieldFactory.current.onShouldChangeValue(newValue)
    };
    onValueChanging = (prevValue, newValue) => {
        console.log('changing, ', prevValue, newValue);
        return true;
    };
    onValueChanged = (prevValue, newValue) => {
        console.log('changed, ', prevValue, newValue);
        this.props.question.value = newValue;
    };
    onExiting = () => {
        var valid = null;
        if (this.props.question.events.onExiting != null)
            valid = this.props.question.events.onExiting.evalSync();
        return valid == null ? true : valid;
    };
    onExited = () => {
        if (this.props.question.events.onExited != null)
            this.props.question.events.onExited.evalSync();
    };
    onEntering = () => {
        var valid = null;
        if (this.props.question.events.onEntering != null)
            valid = this.props.question.events.onEntering.evalSync();
        return valid == null ? true : valid;
    };
    onEntered = () => {
        if (this.props.question.events.onEntered != null)
            this.props.question.events.onEntered.evalSync();
    };
}

QuestionComponent.propTypes = {
    question: PropTypes.instanceOf(Question).isRequired
};
