import { email } from "zod";
import { connectDB } from "../../../../lib/databaseConnection";
import {zSchema} from "../../../../lib/zodSchema"
import { catchError, response } from "../../../../lib/helperFunction";
import UserModel from "../../../../models/User.model";
import * as jose from 'jose'
import { sendMail } from "../../../../lib/sendMail";
import { emailVerificationLink } from "../../../../email/emailVerificationLink";

export async function POST(request) {

    try{
        await connectDB()
        //validatin schema
        const validationSchema = zSchema.pick({
            name:true,email:true,password:true

        })


        const payload = await request.json()
        const validateData = validationSchema.safeParse(payload)
        if (!validateData.success){
           return response (false,401,'invalid or missing input field ', validateData.error)
        }

        const {name,email,password} = validateData.data 

        //check already register
        const checkUser = await UserModel.exists({email})
        if(checkUser){
            return response (true,409,'user alrady register ')

        }

        //new registerations
        const NewRegistration = new UserModel({
            name,email,password
        })
        await NewRegistration.save()

        const secret = new TextEncoder().encode(process.env.SECRET_KEY)
        const token = await new jose.SignJWT({
            userId:NewRegistration._id  })
            .setIssuedAt()
            .setExpirationTime('1h')
            .setProtectedHeader({alg:"HS256"})
            .sign(secret)


        await sendMail(
            'Email verification request form prbain khadka',

            email,
            emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/verify-email/${token}`)
        )

      return response (true, 200, 'Registration success , please verify your email address')




    }
    catch(error){
        catchError(error)


    }
}