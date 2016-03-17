/**
 * Created by miaomiao on 2016/3/15.
 */
var express = require('express');

var router = express.Router();

var cmdCommand = require('./app.core.view_controller/command_mgmt/cmdCommand');
var linuxCommand = require('./app.core.view_controller/command_mgmt/linuxCommand');
// var test = require('./app.core.view_controller/command_mgmt/test');

new cmdCommand(router);
new linuxCommand(router);
// new test(router);
module.exports = router;