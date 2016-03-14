var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/command', function(req, res) {
    //todo /command?exe='ping'&opts=[-v,PId,...]&argv=[sohu.com,...,..]
    var commandString = [];
    var command = {
        exe:req.query.exe,
        opts:req.query.opts,
        argv:req.query.argv
    };
    var formatParams = function(member) {
        // 读取url中格式为数组的参数并将其转换为数组
        var len = member.length;
        for(var i = 0;i < len -1;i ++) {
            commandString.push(member[i]);
            commandString.push(',');
        }
        commandString.push(member[len-1]);
    };

    commandString.push(command.exe);
    if(command.opts){
        // todo 将opts里的参数用逗号隔开
        commandString.push(' ');
        var member = eval(command.opts);
        formatParams(member);
    }
    if(command.argv){
        // todo 将opts里的参数用逗号隔开
        commandString.push(' ');
        var member = eval(command.argv);
        //if(member instanceof Array){
        formatParams(member);
        //}
    }
    var commandUrlStr = commandString.join('');
    // todo res.send('ping sohu.com');

    res.send(commandUrlStr);
});

module.exports = router;
