const http = require('http');
const app = require('./app.js');
const PORT = process.env.PORT;
const server = http.createServer(app);
const {con} = require('./database/database.js')
function startServer(){
    server.listen(PORT,()=>{
        console.log(`Server is live at http://localhost:${PORT} ....`);
    });
}

con().then(startServer());