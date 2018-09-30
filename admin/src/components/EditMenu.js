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
                <ContextMenuTrigger id={"menu_ctx_1"}>
                    <div>
                        {this.props.menu}
                    </div>
                </ContextMenuTrigger>
                <ContextMenu id={"menu_ctx_1"}>
                    <MenuItem data={1} onClick={this.onClick}>
                        <ListItem style={{padding: 0}}>
                            <ListItemIcon>
                                <EditIcon style={{color: "darkblue"}}/>
                            </ListItemIcon>
                            <ListItemText inset primary="ویرایش"/>
                        </ListItem>
                    </MenuItem>
                    <MenuItem divider/>
                    <MenuItem data={1} onClick={this.onClick}>
                        <ListItem style={{padding: 0}}>
                            <ListItemIcon>
                                <CloseIcon style={{color: "darkred"}}/>
                            </ListItemIcon>
                            <ListItemText inset primary="حذف"/>
                        </ListItem>
                    </MenuItem>

                </ContextMenu>
            </div>
        )
    }
}