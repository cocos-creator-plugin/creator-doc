exports.methods = {
    open_panel () {
        const { name } = require('../package.json');
        console.log(name);
        Editor.Panel.open(name);
    }
};
