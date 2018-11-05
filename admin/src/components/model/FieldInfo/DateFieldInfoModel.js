import {FieldInfoModel} from "./FieldInfoModel";

export class DateFieldInfoModel extends FieldInfoModel{
    constructor(){
        super()
        this.type = 'date';
    }
    mask = '';
}