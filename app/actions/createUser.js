"use server"

import { createAdminClient } from "@/data/config/appwrite"
import { ID } from "node-appwrite"

async function createUser(previousState,formData){
 const name = formData.get("name")
const email = formData.get("email");
const password = formData.get("password")
const confirmPassword = formData.get("confirm-password")

if(!email||!name||!password){
    return{
        error:"please fill in all fields"
    }
}
if(password.length<8){
    return{
        error:"password must be at least 8 characters long"
    }
}
if(password !== confirmPassword){
    return{
        error:"passwords do not match"
    }
}
//get account instance 
const {account} = await createAdminClient()

try {
    // create user
    await account.create(ID.unique(),email,password,name)
    return{
        success:true
    }
} catch (error) {
    console.log("registration failed",error)
    return{
        error:"could not register user"
    }
}
}

export default createUser