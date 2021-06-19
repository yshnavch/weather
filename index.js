var express= require('express')
var app= express()
var axios = require('axios');
var port= process.env.PORT||80
app.use(express.json())
app.use(express.static('public'))

// var rawdata;
app.post('/climate',(req,res)=>{
  const url= `http://api.weatherstack.com/current?access_key=14a68d96870cbe5e1278ddc9db16b3ff&query=${req.body.place}`
  axios({
    url:url,
    responseType:'json',
  }).then(data=>{
    res.json(data.data)
  })
  
})


app.listen(port,()=>{
  console.log(`server listening on ${port}`);
})