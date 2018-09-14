import {BaseCommand} from "./BaseCommand";

export class ClearCommand extends BaseCommand{
    execute=(menu)=>{
        menu.clear();
        console.log('after clear');
    }
}