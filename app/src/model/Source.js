import {a_SyncScript} from "./a_SyncScript";


export class Source {
    parentQuestion;
    isMultiSelect;
    options;

    deserialize(input, parent) {
        this.parentQuestion = parent;
        if (!input) return this;
        this.isMultiSelect = input.isMultiSelect;
        this.options = new a_SyncScript().deserialize(input.options);
        return this;
    }
}
