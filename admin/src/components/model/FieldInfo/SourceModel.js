export class SourceModel {
    options = {
        url: '',
        script: ''
    };

    parse = (obj) => {
        if (obj && obj.options) {
            this.options.script = obj.options.script != null ? obj.options.script : '';
            this.options.url = obj.options.url != null ? obj.options.url : '';
        }
        return this;
    }
}