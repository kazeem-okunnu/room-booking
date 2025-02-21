"use server"
import { createAdminClient,createSessionClient } from "@/data/config/appwrite"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function getSingleRoom(id) {
    try{
const {databases} = await createAdminClient()
//fetch rooms

const room = await databases.getDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
    id

);
//revalidate cache for theis path


return room
    }catch(error){
        console.log(error,"failded to get room")
        redirect("/error")
    }
}

export default getSingleRoom