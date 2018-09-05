/* global $*/
import React from 'react'
import {Group} from "../../model/Group";
import PropTypes from "prop-types";
import {GroupComponent} from "./GroupComponent";
import {GroupValue} from "../../model/GroupValue";
import {api} from "../../services/api";

export class GroupTable extends React.Component {
    state = {cols: [], tempGroup: null, groupValues: []};

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.calculateColumns();
        this.setState({groupValues: this.props.group.groupValues == null ? [] : this.props.group.groupValues});
    }
    componentWillReceiveProps(nextProps) {
        this.setState({groupValues: nextProps.group.groupValues == null ? [] : nextProps.group.groupValues});
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
                            {groupValue.questionValues.map((qValue, j) => <td key={j}>{qValue.value}</td>)}
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
                            <button className="icon spl-save" onClick={this.save}><i className="fa fa-check"/>
                            </button>
                            <button className="icon spl-cancel-save" onClick={this.cancel}><i
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

            </div>
        )
    }

    save = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        api.saveGroup(this.props.group, () => {
            this.setState({loading: false});
        })
    }
    ok = () => {
        this.props.group.addGroupValue(this.state.tempGroup);
        $('#modal' + this.props.group.uid).modal('hide');
        console.log(this.props.group.groupValues.length)
        this.forceUpdate();
    }
    delete = (groupValue) => {
        if(window.confirm("آیا از حذف این آیتم مطمئن هستید؟"))
            this.props.group.deleteGroupValue(groupValue);
        this.forceUpdate();
    }
    calculateColumns = () => {
        const cols = [];
        for (const q of this.props.group.questions) {
            cols.push(q.title);
        }
        this.setState({cols: cols});
    }
    add = () => {
        let newGroup = new GroupValue(this.props.group);
        this.setState({tempGroup: newGroup});
        $('#modal' + this.props.group.uid).modal()
    }

    edit(editItem) {
        this.setState({tempGroup: editItem});
        $('#modal' + this.props.group.uid).modal()
    }
}

GroupTable.propTypes = {
    group: PropTypes.instanceOf(Group).isRequired
};