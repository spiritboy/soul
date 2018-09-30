import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import BallotIcon from '@material-ui/icons/Ballot';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import MenuIcon from '@material-ui/icons/Menu';
import ListIcon from '@material-ui/icons/List';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SearchIcon from '@material-ui/icons/Search';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from "@material-ui/core/es/TextField/TextField";
import {api} from "../services/api";
import Collapse from "@material-ui/core/es/Collapse/Collapse";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";

const styles = theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    }
});

class MenuList extends React.Component {
    state = {
        open: false,
        menus: [],
        filter: ''
    };

    componentWillMount() {
        api.Menus(1).then(d => this.setState({menus: d}))
    }

    doFilterMenu = () => {
        return this.state.menus.filter(d => {
                d.expanded = false;
                let found = d.title.fa.toString().indexOf(this.state.filter) >= 0;
                d.found = found && this.state.filter !== '';
                return found || this.doFilterGroup(d).length > 0;
            }
        )
    }
    doFilterGroup = (menu) => {
        if (menu.found === true) return menu.groups;
        return menu.groups.filter(d => {
                d.expanded = false;
                let found = d.title.fa.toString().indexOf(this.state.filter) >= 0;
                d.found = found && this.state.filter !== '';
                let result = found || this.doFilterQuestion(d, menu).length > 0;
                if (result === true) menu.expanded = true;
                if (result === true && found === false) d.expanded = true;
                return result;
            }
        );
    }
    doFilterQuestion = (group, menu) => {
        if (group.found === true || menu.found === true) return group.questions;
        return group.questions.filter(d => {
            let found = d.title.fa.toString().indexOf(this.state.filter) >= 0;
            d.found = found && this.state.filter !== '';
            return found;
        })
    }
    getGroupIcon = (g) => {
        if (g.groupInfo.type === 'form') {
            return <BallotIcon/>
        }
        else
            return <ListIcon/>
    }
    getQuestionIcon = (q) => {
        if (q.fieldInfo.type === 'text') {
            return <TextFieldsIcon/>
        }
        else if (q.fieldInfo.type === 'select' || q.fieldInfo.type === 'asyncSelect') {
            return <ListAltIcon/>
        }
        else if (q.fieldInfo.type === 'date') {
            return <DateRangeIcon/>
        }
        else {
            return <BallotIcon/>
        }
    }
    handleClick = (e, data,target) => {
        alert(1)
        console.log(data);
    }

    createContextMenu(id, data, onClick) {
        return (
            <ContextMenu id={id}>
                <MenuItem data={data} onClick={onClick}>
                    <ListItem style={{padding: 0}}>
                        <ListItemIcon>
                            <EditIcon style={{color: "darkblue"}}/>
                        </ListItemIcon>
                        <ListItemText inset primary="ویرایش"/>
                    </ListItem>
                </MenuItem>
                <MenuItem divider/>
                <MenuItem data={data} onClick={onClick}>
                    <ListItem style={{padding: 0}}>
                        <ListItemIcon>
                            <CloseIcon style={{color: "darkred"}}/>
                        </ListItemIcon>
                        <ListItemText inset primary="حذف"/>
                    </ListItem>
                </MenuItem>

            </ContextMenu>
        )
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>

                <List
                    component="nav"
                    subheader={<ListSubheader component="div"><TextField value={this.state.filter} onChange={(e) => {
                        this.setState({filter: e.target.value})
                    }} label={<SearchIcon/>}/></ListSubheader>}
                >
                    {this.doFilterMenu().map(menu =>
                        (<div>
                                <ContextMenuTrigger id={"menu_ctx_" + menu.uid}>

                                    <ListItem button onClick={() => {
                                        menu.open = !menu.open;
                                        this.forceUpdate()
                                    }}>
                                        <ListItemIcon>
                                            <MenuIcon/>
                                        </ListItemIcon>
                                        <ListItemText inset primary={menu.title.fa}
                                                      className={(menu.found === true ? "highlight" : "")}/>
                                        {menu.open || menu.expanded ? <ExpandLess/> : <ExpandMore/>}
                                    </ListItem>
                                </ContextMenuTrigger>
                                <Collapse in={menu.open || menu.expanded} timeout="auto" unmountOnExit
                                          style={{"padding-right": "20px"}}>
                                    <List component="div" disablePadding>
                                        {this.doFilterGroup(menu).map(g =>
                                            <div>
                                                <ContextMenuTrigger id={"group_ctx_" + g.uid}>
                                                    <ListItem  button onClick={() => {
                                                        g.open = !g.open;
                                                        this.forceUpdate()
                                                    }}>
                                                        <ListItemIcon>
                                                            {this.getGroupIcon(g)}
                                                        </ListItemIcon>
                                                        <ListItemText title={"group_ctx_" + g.uid} inset primary={g.title.fa}
                                                                      className={(g.found === true ? "highlight" : "")}/>
                                                        {g.open || g.expanded ? <ExpandLess/> : <ExpandMore/>}
                                                    </ListItem>
                                                </ContextMenuTrigger>
                                                <Collapse in={g.open || g.expanded} timeout="auto" unmountOnExit
                                                          style={{"padding-right": "20px"}}>
                                                    <List component="div" disablePadding>
                                                        {
                                                            this.doFilterQuestion(g, menu).map(q =>
                                                                <div>
                                                                    <ContextMenuTrigger id={"question_ctx_" + q.uid}>
                                                                        <ListItem button>
                                                                            <ListItemIcon>
                                                                                {this.getQuestionIcon(q)}
                                                                            </ListItemIcon>
                                                                            <ListItemText inset primary={q.title.fa}
                                                                                          className={(q.found === true ? "highlight" : "")}/>
                                                                        </ListItem>
                                                                    </ContextMenuTrigger>
                                                                    {this.createContextMenu("question_ctx_" + q.uid, q, this.handleClick)}
                                                                </div>
                                                            )
                                                        }
                                                    </List>
                                                </Collapse>
                                                {this.createContextMenu("group_ctx_" + g.uid, g, this.handleClick)}
                                            </div>
                                        )}
                                    </List>
                                </Collapse>
                                {this.createContextMenu("menu_ctx_" + menu.uid, menu, this.handleClick)}

                            </div>
                        )
                    )}

                </List>

            </div>
        );
    }
}

export default withStyles(styles)(MenuList);
