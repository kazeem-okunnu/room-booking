"use server"
import { createSessionClient } from "@/data/config/appwrite"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Query } from "node-appwrite"

async function getMyRooms() {
    const sessionCookie = cookies().get("appwrite-session")
    if(!sessionCookie){
        redirect("/login")
    }
    try{
const {account,databases} = await createSessionClient(sessionCookie.value)

//get users id
const user = await account.get()
const userId = user.$id
//fetch users rooms

const {documents:rooms} = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
    [Query.equal("user_id",userId)]

);


return rooms
    }catch(error){
        console.log(error,"failded to get user rooms")
        redirect("/error")
    }
}

export default getMyRooms