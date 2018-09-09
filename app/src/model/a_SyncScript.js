import {api} from "../services/api";

export class a_SyncScript {
    url;
    script;

    eval = (callback, ...params) => {
        if (this.url != null) {
            //async
            let tempUrl = this.url;
            for (let param of params) {
                tempUrl = tempUrl.replace(param.key, param.value);
            }
            api.get(tempUrl, (data) => {
                callback(data);
            });
        }
        else if (this.script != null) {
            let options = eval(this.script);
            callback(options.filter(v => v.label.toString().toLowerCase().indexOf(params[0].value.toString().toLowerCase()) > -1));
        }
    }
    evalSync = (...params) => {
        if (this.url != null) {
            //async
            let tempUrl = this.url;
            for (let param of params) {
                tempUrl = tempUrl.replace(param.key, param.value);
            }
            return api.get(tempUrl, null ,false);
        }
        else if (this.script != null) {
            let options = eval(this.script);
            return options.filter(v =>params.length === 0 || v.label.toString().toLowerCase().indexOf(params[0].value.toString().toLowerCase()) > -1);
        }
    }

    deserialize(input) {
        if (!input) return null;
        this.url = input.url;
        this.script = input.script;
        return this;
    }
}