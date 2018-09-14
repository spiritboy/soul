import {BaseCommand} from "./BaseCommand";

export class SaveCommand extends BaseCommand {
    constructor(menu,command){
        super()
        this.menu = menu;
        this.guid = command.guid;
    }
    execute = () => {
        this.menu.findGroup(this.guid).save()
    }
}