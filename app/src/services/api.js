import {Menu} from "../model/Menu";

export class api {
    static url(path) {
        return 'http://localhost:3000' + path;
    };

    static getDefinition(menuId) {
        return fetch(api.url('/getDefinition'))
            .then(res => res.json()).then(res => new Menu().deserialize(res));
    }

    static searchMenu(group, callback) {
        const result = group.normalizeData()
        result.menuUid = group.parentMenu.uid;

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const data = JSON.parse(this.responseText);
                callback(data);
            }
        };
        xhttp.open("POST", api.url('/searchMenu'), true);
        xhttp.setRequestHeader("Content-Type", "application/json");

console.log(result);
        xhttp.send(JSON.stringify(result));
    }

    static loadFK = (menu, fkId, callback) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const data = JSON.parse(this.responseText);
                callback(data);
            }
        };
        xhttp.open("GET", api.url('/loadfk') + "?fkId=" + fkId, true);
        xhttp.setRequestHeader("Content-Type", "application/json");


        xhttp.send();
    }

    static saveGroup = (group, callback) => {
        const result = group.normalizeData();
        console.log(result);
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const data = JSON.parse(this.responseText);
                group.parentMenu.fkId = data.fkId;
                callback();
            }
        };
        xhttp.open("POST", api.url('/saveData'), true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(result));
    }
    static get = (url, callback, async) => {
        if (async == null) async = true;
        const xhttp = new XMLHttpRequest();
        if (async === true)
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    if (callback != null)
                        callback(data);
                }
            };
        xhttp.open("GET", api.url(url), async);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send();
        if (async === false)
            return JSON.parse(xhttp.responseText);
    }

}