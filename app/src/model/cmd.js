/* eslint no-eval: 0 */

import {api} from "../services/api";
import "../helper";
import {SetValueCommand} from "./commands/SetValueCommand";
import {MessageCommand} from "./commands/MessageCommand";
import {FocusCommand} from "./commands/FocusCommand";
import {InitCommand} from "./commands/InitCommand";
import {ClearCommand} from "./commands/ClearCommand";

export class cmd {
    url;
    script;
    parent;
    getMenu=()=>{return this.parent.parentGroup.parentMenu;}
    findQuestion(guid, quid, row) {
        return this.getMenu().findQV(guid, quid, row);
    }

    evalSync = (...params) => {
        let text = '';
        if (this.url != null) text = this.url;
        else if (this.script != null) text = this.script;
        for (let param of params) {
            text = text.replace(param.key, param.value);
        }
        text = this.inject(text)
        if (this.url != null) {
            //async
            let out = api.get(text, null, false);
            this.execute(out)
            return out;
        }
        else if (this.script != null) {
            let out = eval(text);
            this.execute(out)
            return out;
        }
    };

    execute=(commands)=>{
        for (let command of commands) {
            if(command.name.toLowerCase() === 'setvalue'){
                var cmd = new SetValueCommand(command.qValue,this.getMenu(),command.guid,command.quid,command.row,command.value);
                cmd.execute();
            }
            else if(command.name.toLowerCase() === 'message'){
                var cmd = new MessageCommand();
                cmd.execute(command.value);
            }
            else if(command.name.toLowerCase() === 'focus'){
                var cmd = new FocusCommand();
                cmd.execute(command.qValue);
            }
            else if(command.name.toLowerCase() === 'init'){
                var cmd = new InitCommand();
                cmd.execute(this.getMenu());
            }
            else if(command.name.toLowerCase() === 'clear'){
                var cmd = new ClearCommand();
                cmd.execute(this.getMenu());
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