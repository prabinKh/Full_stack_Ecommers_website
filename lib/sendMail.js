import nodemailer from 'nodemailer'
import { success } from 'zod'
export const sendMail = async(subject,receiver,body)=>{
    const trasporter = nodemailer.createTransport({
        host:process.env.NODEMAILER_HOST ,
        port:process.env.NODEMAILER_POT,
        secure:false ,
        auth: {
            user:process.env.NODEMAILER_EMAIL,
            password : process.env.NODEMAILER_PASSWORD 

        }

    })
    const  options = {
        from : `"prabin khadka"<${process.env.NODEMAILER_EMAI}>`,
        to:receiver,
        subject:subject,
        html: body
    }

    try{
        await trasporter.sendMail(options)
        return {success : true}

    }
    catch(error){
        return {
            success:false,
            message:error.message}

    }

}