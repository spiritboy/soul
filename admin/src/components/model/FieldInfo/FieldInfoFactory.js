import {TextFieldInfoModel} from "./TextFieldInfoModel";
import {SelectFieldInfoModel} from "./SelectFieldInfoModel";

export class FieldInfoFactory {
    static getFieldInfo(ftype) {
        if (ftype === 'text')
            return new TextFieldInfoModel();
         else if(ftype === 'select')
             return new SelectFieldInfoModel();
        else
            return null;
    }

}