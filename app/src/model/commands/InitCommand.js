import {BaseCommand} from "./BaseCommand";

export class InitCommand extends BaseCommand{
    execute=(menu)=>{
        menu.init();
    }
}