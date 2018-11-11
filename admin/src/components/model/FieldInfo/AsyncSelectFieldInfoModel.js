import {FieldInfoModel} from "./FieldInfoModel";
import {SourceModel} from "./SourceModel";

export class AsyncSelectFieldInfoModel extends FieldInfoModel{
    constructor(){
        super()
        this.type = 'asyncSelect';
    }
    isMultiSelect = false;
    source = new SourceModel();
    parse = (obj) => {
        this.isMultiSelect = obj.isMultiSelect != null ? obj.isMultiSelect : false;
        this.source = new SourceModel().parse(obj.source);
        return this;
    }
}