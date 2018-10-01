import React from 'react';
import MenuList from "./MenuList";
import EditMenu from "./EditMenu";
import {withStyles} from "@material-ui/core/styles";
import {EditQuestion} from "./EditQuestion";
import EditGroup from "./EditGroup";

const styles = theme => ({
    side: {
        width: '250px',
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0
    },
    content: {
        position: "absolute",
        left: "250px",
        paddingTop: "50px",
        paddingLeft: "10px"
    },
});

class Main extends React.Component {

    state = {
        editingMenu: null,
        editingGroup: null,
        editingQuestion: null
    };
    initState = () => {
        this.setState({
            editingMenu: null,
            editingGroup: null,
            editingQuestion: null
        })
    }
    onMenuEdit = (menu) => {
        this.setState({
            editingMenu: menu.uid,
            editingGroup: null,
            editingQuestion: null
        });
    };
    onGroupEdit = (group,menu) => {
        this.setState({
            editingGroup: group.uid,
            editingMenu: menu.uid,
            editingQuestion: null
        });
    };
    onQuestionEdit = (question,group,menu) => {
        this.setState({
            editingQuestion: question.uid,
            editingMenu: menu.uid,
            editingGroup:  group.uid,
        });
    };
    generateEditingControl = () => {
        if (this.state.editingQuestion != null)
            return <EditQuestion quid={this.state.editingQuestion}/>;
        else if (this.state.editingGroup != null)
            return <EditGroup muid={this.state.editingMenu} guid={this.state.editingGroup}/>;
        else if (this.state.editingMenu != null)
            return <EditMenu muid={this.state.editingMenu}/>;
        else
            return null;
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.side}>
                    <MenuList onMenuEdit={this.onMenuEdit} onGroupEdit={this.onGroupEdit}
                              onQuestionEdit={this.onQuestionEdit}/>
                </div>
                <div className={classes.content}>
                    {
                        this.generateEditingControl()
                    }

                </div>

            </div>
        )
    }
}

export default withStyles(styles)(Main);