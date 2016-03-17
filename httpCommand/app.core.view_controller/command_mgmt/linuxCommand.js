var sudo = require('sudo');
var exec = require('child_process').exec;
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf-8');
const spawn = require('child_process').spawn;

var inspect = require('util').inspect;

function Controller(router) {
	var me = this;
	router.get('/linuxCommand',function(req,res) {
		me.doLinuxCommand(req,res);
	});
};
Controller.prototype.doLinuxCommand = function(req,res) {
	var commandString = [];
        var command = {
            exe:req.query.exe,
            // opts:req.query.opts,
            argv:req.query.argv
        };
        var formatParams = function(member) {
            // 读取url中格式为数组的参数并将其转换为数组
            var len = member.length;
            for(var i = 0;i < len -1;i ++) {
                commandString.push(member[i]);
                // commandString.push(',');
                commandString.push(' ');
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
        var options = {
			cachePassword: true,
		    prompt: 'Please enter Password:',
		    spawnOptions: {
		    	cwd:'./'
		    }
        };
       	// [ 'cp', '-r', 'app.js','app_copy.js' ]
        var childProcess = sudo([ 'cp', '-r', 'app.js','app_copy.js' ],options);
        childProcess.stdout.on('data',function(data) {
            console.log(data);
        });
        childProcess.stderr.on('error',function(data) {
            console.log('error');
        });
        // console.dir((childProcess.stdout));
        // console.log(inspect(childProcess.stdout));
        // console.log(inspect(childProcess.stderr));

        res.send(commandUrlStr);
};

module.exports = Controller;
