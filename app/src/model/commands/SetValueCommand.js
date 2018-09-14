import {BaseCommand} from "./BaseCommand";

export class SetValueCommand extends BaseCommand {
    qValue=null;
    menu = null;
    guid = null;
    quid = null;
    row = null;
    value =null;

    constructor(_qValue, _menu, _guid, _quid, _row, _value) {
        super();
        this.qValue = _qValue;
        this.menu = _menu;
        this.guid = _guid;
        this.quid = _quid;
        this.row = _row;
        this.value = _value;
    }

    execute = () => {
        if (this.qValue == null) {
            this.qValue = this.menu.findQV(this.guid, this.quid, this.row);
        }
        this.qValue.value = this.value;
    }
}