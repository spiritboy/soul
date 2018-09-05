/* global $*/
import React from 'react'
import PropTypes from 'prop-types';
import {Menu} from "../../model/Menu";
import {GroupComponent} from "../Group/GroupComponent";
import {GroupList} from "../Facilities/GroupList";
import {SearchDialog} from "../Facilities/SearchDialog";
import {api} from "../../services/api";
import {GroupTable} from "../Group/GroupTable";

export class MenuComponent extends React.Component {

    search = () => {
        $('#myModal').modal()
    }

    render() {
        return (
            <div className={'container'}>
                <header>
                    <h1>{this.props.menu.title}</h1>
                    <div className={'div-buttons'}>
                        <button className='search-button icon' onClick={this.search}>
                            <i className="fa fa-search"/>
                        </button>
                        <button className={'load-button icon'}>
                            <i className="fa fa-book-open"/>
                        </button>
                    </div>
                    <div className={"clear"}></div>
                </header>
                <hr/>
                <div className="row">
                    <div className="col-md-3">
                        <GroupList menu={this.props.menu}/>
                    </div>
                    <div className="col-md-9">
                        <div className="tab-content">
                            {this.props.menu.groups.map((gr, i) => {
                                return (
                                    <div key={gr.uid} id={gr.uid} className="tab-pane fade  group">
                                        {gr.groupInfo.type === 'form' ?
                                            <GroupComponent isSearch={false}
                                                            groupValue={gr.groupValues[0]}/>
                                            :
                                            <GroupTable group={gr}/>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                {<SearchDialog onSelect={this.loadFk} group={this.props.menu.search}/>}
            </div>
        )
    }

    loadFk = (fkId) => {

        this.props.menu.init();
        api.loadFK(this.props.menu, fkId, (data) => {
            this.props.menu.fkId = fkId;
            for (const guid in data) {
                if (Array.isArray(data[guid])) {
                    let i = 0;
                    for (const row of data[guid]) {
                        for (const quid in row) {
                            const foundQV = this.props.menu.findQV(guid, quid, i);
                            if (foundQV) {
                                foundQV.value = row[quid];
                            }
                        }
                        i = i+1;
                    }
                }
                else
                    for (const quid in data[guid]) {
                        const foundQV = this.props.menu.findQV(guid, quid);
                        if (foundQV) {
                            foundQV.value = data[guid][quid];
                        }
                    }
            }
            this.forceUpdate();
            $('#myModal').modal('hide')

        });
    }
}

MenuComponent.propTypes = {
    menu: PropTypes.instanceOf(Menu).isRequired
};