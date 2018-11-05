import {FieldInfoModel} from "./FieldInfoModel";

export class SelectFieldInfoModel extends FieldInfoModel{
    constructor(){
        super()
        this.type = 'select';
    }
    source=''
}