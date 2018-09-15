import React from 'react'
import PropTypes from 'prop-types';
import {QuestionComponent} from "../Question/QuestionComponent";
import {GroupValue} from "../../model/GroupValue";

export class GroupComponent extends React.Component {

    state = {
        loading: false,
        groupValue: null,
        isDirty: false,
        isValid:true
    };

    componentWillMount() {
        this.setState({groupValue: this.props.groupValue})
        //listen once
        console.log(this.props.groupValue)
        this.props.groupValue.group.eventIsDirtyChanged.push(this.whenDirtyChanged);
        this.props.groupValue.group.eventSaving.push(this.onGroupSavingHandler);
        this.props.groupValue.group.eventSaved.push(this.onGroupSavedHandler);
        this.props.groupValue.group.eventLoading.push(this.onGroupLoadingHandler);
        this.props.groupValue.eventOnValidChanged.push(this.whenValidChanged);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({groupValue: nextProps.groupValue})
    }
    whenValidChanged = (isValid) => {
        this.setState({isValid});
    };
    whenDirtyChanged = (isDirty) => {
        this.setState({isDirty});
    };
    save = (e) => {
        e.preventDefault();
        this.props.groupValue.group.save();
    };
    onGroupLoadingHandler = (isLoading) => {
        this.setState({loading: isLoading});
    }
    onGroupSavingHandler = () => {
        return true;
    }
    onGroupSavedHandler = () => {
    }
    cancel = (e) => {
        e.preventDefault();
        this.state.groupValue.rollbackValue();
    }

    render() {
        if (this.state.groupValue == null) return null;
        return (
            <form>
                <div className="group">
                    <div className="row">
                        {this.state.groupValue.questionValues.map((qValue) => {
                            return (
                                <div key={qValue.question.uid} className="col-md-3">
                                    <QuestionComponent questionValue={qValue}/>
                                </div>
                            )
                        })}

                    </div>
                    <div>
                        {(this.props.isSearch === false) ?
                            <div>
                                <button className="icon green" disabled={!this.state.isDirty || !this.state.isValid} onClick={this.save}><i
                                    className="fa fa-check"/>
                                </button>
                                <button className="icon red" disabled={!this.state.isDirty} onClick={this.cancel}><i
                                    className="fa fa-times"/></button>
                            </div>
                            :
                            <div></div>

                        }
                    </div>
                    <div style={{
                        position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: "red",
                        display: this.state.loading ? "block" : "none"
                    }}></div>
                </div>
            </form>
        )
    }

}

GroupComponent.propTypes = {
    groupValue: PropTypes.instanceOf(GroupValue).isRequired
};