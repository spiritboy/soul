import {api} from "../../services/api";

export class EditMenuModel {
    uid = '';
    fatitle = '';
    entitle = '';
    load = (muid, callback) => {
        this.uid = muid;
        api.menu(muid, (d) => {
            this.fatitle = d.title.fa;
            this.entitle = d.title.en;
            if (callback != null)
                callback(d);
        });
    };
    save = () => {
        api.saveMenu(this, (d) => {
            console.log(d);
        })
    }
}