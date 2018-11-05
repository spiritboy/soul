import {FieldInfoModel} from "./FieldInfoModel";

export class AsyncSelectFieldInfoModel extends FieldInfoModel{
    constructor(){
        super()
        this.type = 'asyncSelect';
    }
    mask = '';
}