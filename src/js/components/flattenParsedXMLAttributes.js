var flattenParsedXMLAttributes = function (obj, parent) {
    var res = obj;

    if (Object.prototype.toString.call(obj) === '[object Array]') {
        res = obj.concat();
        for (var i = 0; i < obj.length; i++) {
            res[i] = flattenParsedXMLAttributes(res[i], res);
        }
    } else if (typeof res === 'object') {
        res = Object.assign({}, obj);
        for (var prop in res) {
            res[prop] = flattenParsedXMLAttributes(res[prop], res, prop);
            if (prop.indexOf('$t') === 0 && parent) {
                res = res[prop];
            }
        }
    }

    return res;
};