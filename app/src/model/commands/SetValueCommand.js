import {BaseCommand} from "./BaseCommand";

export class SetValueCommand extends BaseCommand {
    constructor(qValue,menu, command) {
        super();
        this.qValue = qValue;
        this.menu = menu;
        this.guid = command.guid;
        this.quid = command.quid;
        this.row = command.row;
        this.value = command.value;
    }
    execute = () => {
        if (this.qValue == null) {
            this.qValue = this.menu.findQV(this.guid, this.quid, this.row);
        }
        this.qValue.value = this.value;
    }
}