import React from 'react'
import PropTypes from 'prop-types';
import {QuestionComponent} from "../Question/QuestionComponent";
import {api} from "../../services/api";
import {GroupValue} from "../../model/GroupValue";

export class GroupComponent extends React.Component {

    state = {
        loading: false,
        groupValue: null
    };

    componentWillMount() {
        this.setState({groupValue: this.props.groupValue})
    }

    save = () => {
        this.setState({loading: true});
        api.saveGroup(this.s.groupValue.group, () => {
            this.setState({loading: false});
        })
    }
    cancel = (e) => {
        e.preventDefault();
        this.state.groupValue.group.init();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({groupValue: nextProps.groupValue})
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
                                <button className="icon spl-save" onClick={this.save}><i className="fa fa-check"/>
                                </button>
                                <button className="icon spl-cancel-save" onClick={this.cancel}><i
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