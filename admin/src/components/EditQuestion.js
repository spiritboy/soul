import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "../../node_modules/@material-ui/icons/Save";
import CloseIcon from "../../node_modules/@material-ui/icons/Close";
import {withStyles} from "@material-ui/core/styles";
import {EditQuestionModel} from "./model/EditQuestionModel";
import {helper} from "../lib/helper";

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
export class EditQuestion extends React.Component {
    model = new EditQuestionModel();
    state = this.model;
    componentDidMount() {
        this.model.load(this.props.muid,this.props.guid,this.props.quid, () => {
            this.forceUpdate();
        })
    }
    componentWillReceiveProps(nextProps) {
        this.model.load(nextProps.muid,nextProps.guid,nextProps.quid, () => {
            this.forceUpdate();
        })
    }
    handleChange = name => e => {
        helper.setValue(this.model,name,e.target.value);
        this.forceUpdate();
    }
    render() {
        const {classes} = this.props;
        return (
            <div>
                {/*<h1>ویرایش مشخصات گروه</h1>*/}
                <form noValidate autoComplete="off">
                    <div className={classes.container}>
                        <TextField
                            id="outlined-uid"
                            label="شناسه منو"
                            className={classes.textField}
                            value={this.state.uid}
                            onChange={this.handleChange('uid')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-fa-title"
                            label="عنوان فارسی"
                            className={classes.textField}
                            value={this.state.title.fa}
                            onChange={this.handleChange('title.fa')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-en-title"
                            label="عنوان انگلیسی"
                            className={classes.textField}
                            value={this.state.title.en}
                            onChange={this.handleChange('title.en')}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <Button variant="contained" size="small" className={classes.button} onClick={() => {
                            this.model.save()
                        }}>
                            <SaveIcon className={classes.leftIcon}/>
                            ذخیره
                        </Button>
                        <Button variant="contained" size="small" className={classes.button}>
                            <CloseIcon className={classes.leftIcon}/>
                            بستن
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}
export default withStyles(styles)(EditQuestion);