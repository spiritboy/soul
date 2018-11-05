import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {TextFieldInfoModel} from "../model/FieldInfo/TextFieldInfoModel";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});


class TextFieldInfo extends React.Component {
    model = new TextFieldInfoModel();
    state = this.model;
    render() {
        const {classes} = this.props;
        return (<input/>)
    }
}
export default withStyles(styles)(TextFieldInfo);