import React from 'react'
import PropTypes from 'prop-types';
import {Question} from "../../model/Question";
import {FieldFactory} from "../Field/FieldFactory";
import {QuestionValue} from "../../model/GroupValue";

export class QuestionComponent extends React.Component {
    constructor(props) {
        super(props);
        props.questionValue.onValueChanged.push(this.onQuestionValueChanged);
        props.questionValue.question.forceUpdate = this.onQuestionForceUpdate;
        this.fieldFactory = React.createRef();
    }

    componentWillMount() {
        this.setState({questionValue: this.props.questionValue})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({questionValue: nextProps.questionValue})
        if(nextProps.questionValue.onValueChanged.length == 0)
            nextProps.questionValue.onValueChanged.push(this.onQuestionValueChanged)

    }

    render() {
        return (
            <div>
                <div className={"form-group"}>
                    <label className={"control-label"}>{this.state.questionValue.question.title}</label>
                    <FieldFactory ref={this.fieldFactory} onValueChanged={this.onValueChanged}
                                  onValueChanging={this.onValueChanging}
                                  onQuestionValueChanged={this.onQuestionValueChanged}
                                  onEntering={this.onEntering}
                                  onEntered={this.onEntered}
                                  onExiting={this.onExiting}
                                  onExited={this.onExited}
                                  questionValue={this.state.questionValue}/>
                </div>
            </div>
        )
    };

    onQuestionForceUpdate = () => {
        this.forceUpdate();
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
}

QuestionComponent.propTypes = {
    questionValue: PropTypes.instanceOf(QuestionValue).isRequired
};
