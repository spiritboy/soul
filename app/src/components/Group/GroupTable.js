/* global $*/
import React from 'react'
import {Group} from "../../model/Group";
import PropTypes from "prop-types";
import {GroupComponent} from "./GroupComponent";

export class GroupTable extends React.Component {
    state = {cols: [], searchResult: [], tempGroup:null};

    constructor(props) {
        super(props);
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
                    </tr>
                    </thead>
                </table>
                <button onClick={this.open}>open
                </button>
                <div className="modal fade" id={'modal' + this.props.group.uid} tabIndex={-1} role="dialog"
                     aria-labelledby="myModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                {(this.state.tempGroup == null?null:<GroupComponent group={this.state.tempGroup}/>)}
                                <div className={'div-buttons'}>
                                    <button className='icon' onClick={this.save}>
                                        <i className="fa fa-plus"/>
                                    </button>
                                    <button className='icon'>
                                        <i className="fa fa-minus" onClick={() => {
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

    componentWillMount() {
        this.calculateColumns();
    }

    open = () => {
        let newGroup = this.props.group.clone();
        newGroup.questions[0].value = "amin";
        this.setState({tempGroup:newGroup})
        $('#modal' + this.props.group.uid).modal()
    }
    save = () => {

    }
    calculateColumns = () => {
        const cols = [];
        for (const q of this.props.group.questions) {
            cols.push(q.title);
        }
        console.log(cols);
        this.setState({cols: cols});
    }
}

GroupComponent.propTypes = {
    group: PropTypes.instanceOf(Group).isRequired
};