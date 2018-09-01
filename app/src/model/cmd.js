import {api} from "../services/api";
import  "../helper";
export class cmd {
    url;
    script;
    parent;

    findQuestion(guid,quid){
        return this.parent.parentGroup.parentMenu.findQV(guid,quid);
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
            return api.get(text, null, false);
        }
        else if (this.script != null) {
            let out = eval(text);
            return out;
        }
    };
    inject = (rawCmd) => {
        let _rawCmd = rawCmd;
        let re = /<#[^#]*#>/g
        var m;
        do {
            m = re.exec(_rawCmd);
            if (m) {
                let str = m[0].replace('<#','').replace('#>','');
                rawCmd = rawCmd.replace(m[0],eval(str))
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