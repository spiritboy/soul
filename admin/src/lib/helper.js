export class helper {
    /**
     * @obj: the json object to change
     * @access: string dot separates route to value
     * @value: new valu
     */
    static setValue = function (obj, path, value) {
        if (typeof(path) == 'string')
            path = path.split('.');

        if (path.length > 1) {
            var currentPath = path.shift();
            helper.setValue(obj[currentPath], path, value);
        }
        else {
            obj[path[0]] = value;
        }

    }
}