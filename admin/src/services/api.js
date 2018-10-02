export class api {
    static url(path) {
        return 'http://localhost:3000' + path;
    };

    static Menus(menuId) {
        return fetch(api.url('/admin/menus'))
            .then(res => res.json());
    }

    static group(muid, guid, callback) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const data = JSON.parse(this.responseText);
                if (callback != null)
                    callback(data);
            }
        };
        xhttp.open("GET", api.url('/admin/group') + "?muid=" + muid + "&guid=" + guid, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send();
    }

    static saveGroup(model, callback) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const data = JSON.parse(this.responseText);
                if (callback != null)
                    callback(data);
            }
        };
        xhttp.open("POST", api.url('/admin/saveGroup'), true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(model));
    }

    static menu(muid, callback) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const data = JSON.parse(this.responseText);
                if (callback != null)
                    callback(data);
            }
        };
        xhttp.open("GET", api.url('/admin/menu') + "?uid=" + muid, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send();
    }

    static saveMenu(model, callback) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const data = JSON.parse(this.responseText);
                if (callback != null)
                    callback(data);
            }
        };
        xhttp.open("POST", api.url('/admin/saveMenu'), true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(model));
    }

    static question(muid, guid, quid, callback) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const data = JSON.parse(this.responseText);
                if (callback != null)
                    callback(data);
            }
        };
        xhttp.open("GET", api.url('/admin/question') + "?quid=" + quid + "&guid=" + guid + "&muid=" + muid, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send();
    }

    static saveQuestion(model, callback) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const data = JSON.parse(this.responseText);
                if (callback != null)
                    callback(data);
            }
        };
        xhttp.open("POST", api.url('/admin/saveQuestion'), true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(model));
    }
}