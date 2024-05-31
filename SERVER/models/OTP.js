const mongoose = require("mongoose") 
const mailSender = require("../utils/mailSender")

const OTPSchema =new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    
    }

})

//function -> to Send email
async function sedVerificationMail(email,otp){
    try{
        const mailResponse=await mailSender(email,"Verification Email from CodeGenix");
        console.log("Email Sent succesfully: ",mailResponse);
    }catch(error){
        console.log("error occured while sending mails: " ,error)
        throw error
    }
}

OTPSchema.pre("save",async function(next){
    await sedVerificationMail(this.email,this.otp);
    next();
})


module.exports=mongoose.model("OTP",OTPSchema)