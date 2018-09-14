import {BaseCommand} from "./BaseCommand";

export class MessageCommand extends BaseCommand {
    execute = (message) => {
        alert(message);
    }
}