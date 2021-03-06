import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import {EditGroupModel} from "./model/EditGroupModel";


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
const groupTypes = [{value: 'form', label: 'فرم'}, {value: 'table', label: 'جدول'}];

class EditGroup extends React.Component {
    model = new EditGroupModel();
    state = this.model;

    componentWillMount() {
        this.model.load(this.props.muid, this.props.guid, () => {
            this.forceUpdate();
        })
    }

    componentWillReceiveProps(nextProps) {
        this.model.load(nextProps.muid, this.props.guid, () => {
            this.forceUpdate();
        })
    }

    handleChange = name => e => {
        this.model[name] = e.target.value;
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
                            label="شناسه گروه"
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
                            value={this.state.fatitle}
                            onChange={this.handleChange('fatitle')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-en-title"
                            label="عنوان انگلیسی"
                            className={classes.textField}
                            value={this.state.entitle}
                            onChange={this.handleChange('entitle')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField select label={"نوع گروه"}
                                   margin="normal"
                                   className={classes.textField}
                                   value={this.state.type}
                                   onChange={this.handleChange('type')}
                                   variant="outlined"
                                   style={{width: '200px'}}>
                            {
                                groupTypes.map(op => <MenuItem key={op.value} value={op.value}>{op.label}</MenuItem>)
                            }
                        </TextField>
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

export default withStyles(styles)(EditGroup);