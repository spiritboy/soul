import React from 'react'
import PropTypes from "prop-types";
import {QuestionValue} from "../../../model/GroupValue";
import {TextDisplayField} from "./TextDisplayField";
import {SelectDisplayField} from "./SelectDisplayField";

export class DisplayFieldFactory extends React.Component {
    state = {questionValue: null}
    field;

    constructor(props) {
        super(props);
        this.field = React.createRef();
    }
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
        let field = null;
        if (this.state.questionValue.question.fieldInfo.type === 'text')
            field = <TextDisplayField ref={this.field}  value={this.state.questionValue.value} />
        else if (this.state.questionValue.question.fieldInfo.type === 'date')
            field = <TextDisplayField ref={this.field}  value={this.state.questionValue.value} />
        else if (this.state.questionValue.question.fieldInfo.type === 'asyncSelect')
            field = <SelectDisplayField ref={this.field}
                                        source={this.state.questionValue.question.fieldInfo.source}
                                        value={this.state.questionValue.value} />
        else if (this.state.questionValue.question.fieldInfo.type === 'select')
            field = <SelectDisplayField ref={this.field}
                                        source={this.state.questionValue.question.fieldInfo.source}
                                        value={this.state.questionValue.value} />
        return field;

    }
}

DisplayFieldFactory.propTypes = {
    questionValue: PropTypes.instanceOf(QuestionValue)
}