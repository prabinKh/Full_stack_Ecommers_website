import { NextResponse } from "next/server"

export const response = (success, statusCode,message,data={})=>{
    return NextResponse.json({
        success,statusCode,message,data
    })

}

export const catchError =(error,customMessage)=>{
    //handling duplicate key error
    if (error.code == 11000){
        const keys = Object.keys(error.keyPattern).join(',')
        error.message = `Duplicate field: ${keys}. these fields value must be unique`

    }
    let errorObj ={}

    if (process.env.NODE_ENV==='developement'){
        errorObj={
            message: error.message,
            error
        }

    }else{
        errorObj={
            message: customMessage || "INternal server error",
            
        }

    }
    return response (false,error.code, ...errorObj)
}