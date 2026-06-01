const express = require('express');

const app = express();
const PORT = 4000;

require('./conn');

app.get('/' , (req, res) => {
    res.send({
        message: "Hi welcome to my backened server"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})