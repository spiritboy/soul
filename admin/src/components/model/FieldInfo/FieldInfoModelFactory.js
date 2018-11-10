import {TextFieldInfoModel} from "./TextFieldInfoModel";
import {SelectFieldInfoModel} from "./SelectFieldInfoModel";
import {DateFieldInfoModel} from "./DateFieldInfoModel";
import {AsyncSelectFieldInfoModel} from "./AsyncSelectFieldInfoModel";

export class FieldInfoModelFactory {
    static initFieldInfo(type) {
        if (type === 'text')
            return new TextFieldInfoModel();
        else if (type === 'select')
            return new SelectFieldInfoModel();
        else if (type === 'date')
            return new DateFieldInfoModel();
        else if (type === 'asyncSelect')
            return new AsyncSelectFieldInfoModel();
        else
            return {type: ''};
    }
    static parseFieldInfo(fieldInfo) {
        if (fieldInfo && fieldInfo.type === 'text')
            return new TextFieldInfoModel().parse(fieldInfo);
        else if (fieldInfo && fieldInfo.type === 'select')
            return new SelectFieldInfoModel().parse(fieldInfo);
        else if (fieldInfo && fieldInfo.type === 'date')
            return new DateFieldInfoModel().parse(fieldInfo);
        else if (fieldInfo && fieldInfo.type === 'asyncSelect')
            return new AsyncSelectFieldInfoModel().parse(fieldInfo);
        else
            return {type: ''};
    }

}