var exec = require('child_process').exec;
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf-8');

function Controller(router) {
    router.get('/cmdCommand', function(req, res) {
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
            formatParams(member);
        }
        var commandUrlStr = commandString.join('');
        exec('chcp 65001');
        // exec('cd ../../');
        // var childProcess = exec('sudo cp -r bin bin_copy');
        var childProcess = exec(commandUrlStr);
        childProcess.stdout.on('data',function(data) {
            console.log(decoder.write(data));
        });
        childProcess.on('error',function(data) {
            console.log('error');
        });
        childProcess.stdout.on('end',function(){
           // console.log('this request end!');     
        });
        res.send(commandUrlStr);
    });
};

module.exports = Controller;
