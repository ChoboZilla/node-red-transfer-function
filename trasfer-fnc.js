module.exports = function(RED) {
    function TransferFcnNode(config) {
        RED.nodes.createNode(this,config);

        this.num1 = config.num1;
        this.num2 = config.num2;
        this.num3 = config.num3;
        this.num4 = config.num4;

        this.den1 = config.den1;
        this.den2 = config.den2;
        this.den3 = config.den3;
        this.den4 = config.den4;

        var node = this;
        var tmp = {};
        
        node.on('input', function(msg, send, done) {
            tmp.num1 = 1;              
            if (node.num1) {           
                tmp.num1 = Number(node.num1);
            }                       
            tmp.num2 = 0;               
            if (node.num2) {            
                tmp.num2 = Number(node.num2);
            }                          
            tmp.num3 = 0;               
            if (node.num3) {            
                tmp.num3 = Number(node.num3);
            }                          

            tmp.num4 = 0;               
            if (node.num4) {            
                tmp.num4 = Number(node.num4);
            }                          

            tmp.den1 = 1;
            if (node.den1) {
                tmp.den1 = Number(node.den1);
            }

            tmp.den2 = 0;
            if (node.den2) {
                tmp.den2 = Number(node.den2);
            }

            tmp.den3 = 0;
            if (node.den3) {
                tmp.den3 = Number(node.den3);
            }

            tmp.den4 = 0;
            if (node.den4) {
                tmp.den4 = Number(node.den4);
            }

            send = send || function() { node.send.apply(node,arguments) };

            const spawn = require("child_process").spawn;
            const python = spawn('python',["TF.py", Number(tmp.num1), Number(tmp.num2), Number(tmp.num3), Number(tmp.num4), Number(tmp.den1), Number(tmp.den2), Number(tmp.den3), Number(tmp.den4)]);
            // tmp.numi & tmp.deni btw send like a string, in python they converted to int or float

            python.stdout.on('data', data => {
                this.log(`stdout:${data}`);
                // Something to do with Python data
            });
            python.on('close', code =>{
                console.log(`child process exited with code ${code}`)
            });
            
            send(msg);
            if (done) {
                done();
            }
        });
    }
    RED.nodes.registerType("trasfer-fnc",TransferFcnNode);
}