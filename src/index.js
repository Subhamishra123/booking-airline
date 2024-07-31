const express=require('express')
const {PORT} = require('./config')
const apiRouter=require('./routes')
const app=express()
app.use('/api',apiRouter)
app.get('/',(request,response)=>{
    return response.status(200).json({
        "message":"ok"
    })
})

app.listen(PORT,()=>{
    console.log(`express started at port : ${PORT}`)
})