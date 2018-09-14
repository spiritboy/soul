import {api} from "../services/api";

export class QuestionValidation{
    question;
    url;
    script;
    getMenu = () => {
        return this.question.parentGroup.parentMenu;
    }


    findQuestion(guid, quid, row) {
        return this.getMenu().findQV(guid, quid, row);
    }
    validate = () => {
        let text = '';
        if (this.url != null) text = this.url;
        else if (this.script != null) text = this.script;

        if (this.url != null) {
            //async
            let out = api.get(text, null, false);
            return out;
        }
        else if (this.script != null) {
            let out = eval(text);
            return out;
        }
    };
    deserialize(input, question ) {
        if (!input) return null;
        this.question = question;
        this.url = input.url;
        this.script = input.script;
        return this;
    }
}