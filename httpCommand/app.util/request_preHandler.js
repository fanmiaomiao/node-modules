/**
 * Created by chen on 2016/2/26.
 */
exports.checkRequest = function (req, res, next) {
    var userData = {};
    var acceptStr = req.headers.accept;
    var acceptArr = acceptStr.split(',');
    if (acceptArr[0] === 'text/html') {
        userData.acceptDataType = 'html';
    } else if (acceptArr[0] === 'text/json') {
        userData.acceptDataType = 'json';
    }
    next();
};