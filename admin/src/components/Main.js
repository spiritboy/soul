import React from 'react';
import MenuList from "./MenuList";
import {EditMenu} from "./EditMenu";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    side: {
        width: '250px',
        position:"absolute",
        left:0,
        top:0,
        bottom:0
    },
    content: {
        position:"absolute",
        left:"250px",
        paddingTop:"50px",
        paddingLeft:"10px"
    },
});

class Main extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.side}>
                    <MenuList/>
                </div>
                <div className={classes.content}>
                    <EditMenu menu={'sasa'}/>
                </div>

            </div>
        )
    }
}

export default withStyles(styles)(Main);