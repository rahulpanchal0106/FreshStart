const http = require('http');
const app = require('./app.js');
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

function startServer(){
    server.listen(PORT,()=>{
        console.log(`Server is live at http://localhost:${PORT} ....`);
    });
}

startServer();