/* eslint no-eval: 0 */

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
            var filter = options.filter(v =>
                //if there is no params
                params == null ||
                params.length === 0 ||
                //if the search is eq to the _id
                v._id.toString() === params[0].value.toString() ||
                //if the label contains the search
                v.label.toString().toLowerCase().indexOf(params[0].value.toString().toLowerCase()) > -1)
            callback(filter);
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