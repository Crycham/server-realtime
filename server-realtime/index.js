var http = require('http');

const { exec } = require("child_process"); 

var app = http.createServer(function(req,res){
    const url = req.url;

    // TODO implement
    let date_ob = new Date();
    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    
    // current year
    let year = date_ob.getFullYear();
    
    // current hours
    let hours = date_ob.getHours();
    
    // current minutes
    let minutes = date_ob.getMinutes();
    
    // current seconds
    let seconds = date_ob.getSeconds();
    let test = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    if (url === "/rt-iaas-stop/") {
        

        exec("pm2 stop index.js ", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
        //process.exit(1);
    }
    if (url === "/rt-iaas/") {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(test));
    }
    
});
app.listen(8080);