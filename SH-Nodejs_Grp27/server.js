const http = require('http');
const fs = require('fs');
const {dirname} = require('path');
const os = require('os');


const host = '127.0.0.1';
const port = '5000';

const server = http.createServer((req, res) =>{
    const path = req.url;

    if (path === '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text');
        const readStream = fs.createReadStream('./pages/index.html', 'utf-8')
        readStream.pipe(res);
     
    }else if (path === '/about'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text');
        const readStream = fs.createReadStream('./pages/about.html', 'utf-8')
        readStream.pipe(res);
    
    }else if (path === '/sys'){
        
        const info = JSON.stringify({
            hostname: os.hostname(),
            platform: os.platform(),
            architecture: os.arch(),
            numberOfCPUS:os.cpus(),
            networkInterfaces: os.networkInterfaces(),
            uptime: os.uptime()
        });
        
        const writeStream = fs.createWriteStream('./osinfo.json', 'utf-8');
        writeStream.write(info);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'text');
        res.end('Your OS info has been saved successfully!');

    }else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text');
        const readStream = fs.createReadStream('./pages/404.html', 'utf-8')
        readStream.pipe(res);
    }
        
        
         
});  
server.listen(port, host, () => {
    console.log('server running at ${host}:${port}');
});