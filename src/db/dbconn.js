const mongoose = require('mongoose');

const uri = "mongodb+srv://aaaaaaaa:aaaaaaaa@cluster0.fi8yora.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true
}).then(()=>{
    console.log('connection succesfull..');
}).catch((error)=>{
    console.log('connection failed');
})