let doT = require('dot');

module.exports = function dotjsLoader(source) {
    let tmplFunc = doT.template(source);
    this.callback(null, tmplFunc.toString() + ";\nmodule.exports = anonymous;");
}
