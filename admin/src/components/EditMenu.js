import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EditIcon from "../../node_modules/@material-ui/icons/Edit";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "../../node_modules/@material-ui/icons/Close";
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";

export class EditMenu extends React.Component {

    componentWillMount() {
    }

    componentWillReceiveProps() {
        this.forceUpdate();
    }

    onClick() {
        alert(1)
    }

    render() {
        return (
            <div>
                <div>
                    {this.props.menu}
                </div>
            </div>
        )
    }
}