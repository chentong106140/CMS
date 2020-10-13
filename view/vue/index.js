const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 8086, () => {
    console.log(`App listening at port 端口是：${process.env.PORT || 8086}`)
});