import {FieldInfoModel} from "./FieldInfoModel";

export class TextFieldInfoModel extends FieldInfoModel{
    constructor(){
        super()
        this.type = 'text';
    }
    mask = '';
}