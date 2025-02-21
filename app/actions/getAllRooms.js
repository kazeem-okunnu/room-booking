"use server"
import { createAdminClient,createSessionClient } from "@/data/config/appwrite"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function getAllRooms() {
    try{
const {databases} = await createAdminClient()
//fetch rooms

const {documents:rooms} = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,

);
//revalidate cache for theis path


return rooms
    }catch(error){
        console.log(error,"failded to get rooms")
        redirect("/error")
    }
}

export default getAllRooms