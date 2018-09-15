import React from 'react'
import PropTypes from 'prop-types';
import {Menu} from "../../model/Menu";

export class GroupList extends React.Component {

    render() {
        return (
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                 aria-orientation="vertical">
                {this.props.menu.groups.map((gr, i) => {
                    return (
                        <a key={gr.uid} className={i === 0? "nav-link active":"nav-link"} title={gr.uid} data-toggle="pill" role="tab"
                           aria-controls={"v-pills-" + gr.uid} aria-selected="true"
                           href={'#' + gr.uid}>
                            <div>
                                <span>{gr.title.value}</span>
                            </div>
                        </a>
                    )
                })}
            </div>
        );
    }
}

GroupList.propTypes = {
    menu: PropTypes.instanceOf(Menu).isRequired
};