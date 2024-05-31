const nodemailer=require("nodemailer");

const mailSender=async(email,title,body)=>
{
    try{
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD

            }
        })

        let info=await transporter.sendMail({
            from:"CodeGenix || welcome to Community",
            to:`${email}`,
            subject:`${title}`,
            htm:`${body}`
        })
        console.log(info);
        return info;
    }
    catch(error) {

    }
}
module.exports=mailSender;