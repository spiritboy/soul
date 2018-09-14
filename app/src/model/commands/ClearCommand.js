import {BaseCommand} from "./BaseCommand";

export class ClearCommand extends BaseCommand {
    constructor(menu, command) {
        super();
        this.menu = menu;
        this.guid = command.guid;
        this.quid = command.quid;
        this.row = command.row;
    }

    //three levels clearance:
    //1- menu
    //2- group
    //3- question value
    execute = () => {
        if (this.quid != null) {
            this.menu.findQV(this.guid, this.quid, this.row).clear();
        }
        else if (this.guid != null) {
            this.menu.findGroup(this.guid).clear();
        }
        else
            this.menu.clear();
        console.log('after clear');
    }
}