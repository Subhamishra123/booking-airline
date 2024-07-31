const {  httpStatusCode } = require('httpstatuscode')
const info=(request,response)=>{
    return response.status(httpStatusCode.OK).json({
        success:true,
        message:"API is live",
        error:{},
        data:{}
    })
}
module.exports={
    info
}