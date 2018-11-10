import {FieldInfoModel} from "./FieldInfoModel";
import {SourceModel} from "./SourceModel";

export class SelectFieldInfoModel extends FieldInfoModel {
    constructor() {
        super();
        this.type = 'select';
    }

    isMultiSelect = false;
    source = new SourceModel();
    parse = (obj) => {
        this.isMultiSelect = obj.isMultiSelect != null ? obj.isMultiSelect : false;
        this.source = new SourceModel().parse(obj.source);
        return this;
    }
}