/* global $*/
import React from 'react'
import PropTypes from 'prop-types';
import {Menu} from "../../model/Menu";
import {GroupComponent} from "../Group/GroupComponent";
import {GroupList} from "../Facilities/GroupList";
import {SearchDialog} from "../Facilities/SearchDialog";
import {api} from "../../services/api";

export class MenuComponent extends React.Component {

    search = () => {
        $('#myModal').modal()
    }

    render() {
        return (
            <div className={'container'}>
                <header>
                    <h1>{this.props.menu.title}</h1>
                    <img src={'http://www.samita.com//Images/Accommodations/fa/tehran-parsian-azadi-hotel.jpg'}/>
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
                                        <GroupComponent isSearch={false} group={gr}/>
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
                for (const quid in data[guid]) {
                    const foundQuestion = this.props.menu.findQuestion(guid, quid);
                    if (foundQuestion) {
                        foundQuestion.value = data[guid][quid];
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