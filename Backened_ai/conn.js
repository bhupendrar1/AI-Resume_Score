const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://bs4004908_db_user:RojkYoWsX0RatcmI@cluster0.uxbza3s.mongodb.net/?appName=Cluster0').then((res)=> {
    console.log('Database Connected Successfully');
}).catch((err)=>{
    console.log('Database Connection Failed', err);
})

