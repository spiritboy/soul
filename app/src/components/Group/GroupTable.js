/* global $*/
import React from 'react'
import {Group} from "../../model/Group";
import PropTypes from "prop-types";
import {GroupComponent} from "./GroupComponent";
import {GroupValue} from "../../model/GroupValue";
import {api} from "../../services/api";
import {DisplayFieldFactory} from "../Field/DisplayField/DisplayFieldFactory";


export class GroupTable extends React.Component {
    state = {
        loading:false,
        cols: [],
        tempGroup: null,
        groupValues: [],
        isDirty: false
    };

    componentWillMount() {
        this.calculateColumns();
        //listen once
        this.props.group.eventIsDirtyChanged.push(this.whenDirtyChanged);
        this.props.group.eventSaving.push(this.onGroupSavingHandler);
        this.props.group.eventSaved.push(this.onGroupSavedHandler);
        this.props.group.eventLoading.push(this.onGroupLoadingHandler);
        this.setState({groupValues: this.props.group.groupValues == null ? [] : this.props.group.groupValues});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({groupValues: nextProps.group.groupValues == null ? [] : nextProps.group.groupValues});
    }

    whenDirtyChanged = (isDirty) => {
        this.setState({isDirty});
    };
    save = (e) => {
        e.preventDefault();
        this.props.group.save();
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
        for(let gv of this.props.group.groupValues){
            gv.rollbackValue();
        }
    }
    render() {
        return (

            <div>
                <table className="table table-responsive-lg table-striped">
                    <thead>
                    <tr>
                        {this.state.cols.map((c, i) => {
                            return (
                                <th key={i}>{c}</th>
                            )
                        })}
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.groupValues.map((groupValue, i) =>
                        <tr key={i}>
                            {groupValue.questionValues.map((qValue, j) => <td key={j}>{
                                <DisplayFieldFactory questionValue={qValue}/>
                            }</td>)}
                            <td>
                                <button className={'icon green'} onClick={() => {
                                    this.edit(groupValue)
                                }}>
                                    <i className="fa fa-edit"></i>
                                </button>
                                <button className={'icon red'} onClick={() => {
                                    this.delete(groupValue)
                                }}>
                                    <i className="fa fa-minus"></i>
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div>
                    {(this.props.group.isSearch === false) ?
                        <div>
                            <button className="icon green" disabled={!this.state.isDirty} onClick={this.save}><i
                                className="fa fa-check"/>
                            </button>
                            <button className="icon red" disabled={!this.state.isDirty} onClick={this.cancel}><i
                                className="fa fa-times"/></button>
                            <button className='icon blue' onClick={this.add}><i className='fa fa-plus'></i></button>
                        </div>
                        :
                        <div>aa</div>

                    }
                </div>
                <div className="modal fade" id={'modal' + this.props.group.uid} tabIndex={-1} role="dialog"
                     aria-labelledby="myModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                {(this.state.tempGroup == null ? null :
                                    <GroupComponent groupValue={this.state.tempGroup}/>)}
                                <div className={'div-buttons'}>
                                    <button className='icon green' onClick={this.ok}>
                                        <i className="fa fa-check"/>
                                    </button>
                                    <button className='icon red'>
                                        <i className="fa fa-times" onClick={() => {
                                            $('#modal' + this.props.group.uid).modal('hide')
                                        }}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{
                    position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: "red",
                    display: this.state.loading ? "block" : "none"
                }}></div>
            </div>
        )
    }

    ok = () => {
        this.props.group.addGroupValue(this.state.tempGroup);
        $('#modal' + this.props.group.uid).modal('hide');
        this.forceUpdate();
    };
    delete = (groupValue) => {
        if (window.confirm("آیا از حذف این آیتم مطمئن هستید؟"))
            this.props.group.deleteGroupValue(groupValue);
        this.forceUpdate();
    };
    calculateColumns = () => {
        const cols = [];
        for (const q of this.props.group.questions) {
            cols.push(q.title);
        }
        this.setState({cols: cols});
    };
    add = () => {
        let newGroup = new GroupValue(this.props.group);
        this.setState({tempGroup: newGroup});
        $('#modal' + this.props.group.uid).modal()
    };

    edit(editItem) {
        this.setState({tempGroup: editItem});
        $('#modal' + this.props.group.uid).modal()
    }
}

GroupTable.propTypes = {
    group: PropTypes.instanceOf(Group).isRequired
};