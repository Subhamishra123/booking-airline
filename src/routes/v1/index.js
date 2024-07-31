const express=require('express')
const router=express.Router()
router.get('/info',(request,response)=>{
    return response.status(200).json({
        "success":"true",
        "path":"/api/v1/info"
    })
})
module.exports=router