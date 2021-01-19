const express = require('express'); // Express web server framework
const app = express();
app.use(express.static(__dirname + '/server-public'));
console.log('Listening on 8888');
app.listen(8888);
