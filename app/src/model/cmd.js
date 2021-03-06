/* eslint no-eval: 0 */

import {api} from "../services/api";
import "../helper";
import {SetValueCommand} from "./commands/SetValueCommand";
import {MessageCommand} from "./commands/MessageCommand";
import {FocusCommand} from "./commands/FocusCommand";
import {ClearCommand} from "./commands/ClearCommand";
import {SaveCommand} from "./commands/SaveCommand";

export class cmd {
    url;
    script;
    parent;
    getMenu = () => {
        return this.parent.parentGroup.parentMenu;
    }

    findQuestion(guid, quid, row) {
        return this.getMenu().findQV(guid, quid, row);
    }

    evalSync = (...params) => {
        if((this.url == null || this.url === '') && (this.script == null || this.script === '')) {
            return null;
        }
        let text = '';
        if (this.url != null && this.url !== '') text = this.url;
        else if (this.script != null && this.script !== '') text = this.script;
        for (let param of params) {
            text = text.replace(param.key, param.value);
        }
        text = this.inject(text)
        if (this.url != null&& this.url !== '') {
            //async
            let out = api.get(text, null, false);
            if(out!=null)
                this.execute(out);
            return out;
        }
        else if (this.script != null&& this.script !== '') {
            let out = eval(text);
            if(out!=null)
                this.execute(out);
            return out;
        }
    };

    execute = (commands) => {
        if(commands == null) return null;
        for (let command of commands) {
            if (command.name.toLowerCase() === 'setvalue') {
                var cmd = new SetValueCommand(command.qValue, this.getMenu(), command);
                cmd.execute();
            }
            else if (command.name.toLowerCase() === 'message') {
                var cmd = new MessageCommand();
                cmd.execute(command.value);
            }
            else if (command.name.toLowerCase() === 'focus') {
                var cmd = new FocusCommand();
                cmd.execute(command.qValue);
            }
            else if (command.name.toLowerCase() === 'save') {
                var cmd = new SaveCommand(this.getMenu(), command);
                cmd.execute();
            }
            else if (command.name.toLowerCase() === 'clear') {
                var cmd = new ClearCommand(this.getMenu(), command);
                cmd.execute();
            }
        }
        //we need an update after commands execution ...
        this.getMenu().raiseEventDoUpdate();

    };

    inject = (rawCmd) => {
        let _rawCmd = rawCmd;
        let re = /<#[^#]*#>/g
        var m;
        do {
            m = re.exec(_rawCmd);
            if (m) {
                let str = m[0].replace('<#', '').replace('#>', '');
                rawCmd = rawCmd.replace(m[0], eval(str))
            }
        } while (m);
        return rawCmd;
    };

    deserialize(input, parent) {
        if (!input) return null;
        this.parent = parent;
        this.url = input.url;
        this.script = input.script;
        return this;
    }
}