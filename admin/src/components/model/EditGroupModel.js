import {api} from "../../services/api";

export class EditGroupModel {
    uid = '';
    muid = '';
    fatitle = '';
    entitle = '';
    type = '';
    load = (muid, guid, callback) => {
        this.muid = muid;
        this.uid = guid;
            api.group(muid, guid, (d) => {
                this.fatitle = d.title.fa;
                this.entitle = d.title.en;
                this.type = d.groupInfo.type;
                if (callback != null)
                    callback(d);
            });
    };
    save = () => {
        api.saveGroup(this,(d)=>{console.log(d);})
    }
}