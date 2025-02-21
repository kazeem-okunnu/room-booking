"use server";

import { createAdminClient } from "@/data/config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";

async function createRoom(previousState,formData){
// get database instance
const {databases,storage} = await createAdminClient()

try{
const {user} = await checkAuth()
if(!user){
    return{
        error:"you must be logged in to create a room"
    }
}
//setting up image
let imageID;
const image = formData.get("image")
if(image && image.size > 0 && image.name !== "undefined"){
    try{
 //upload
 const response = await storage.createFile("rooms",ID.unique(),image)
  imageID = response.$id;
    }catch(error){
 console.log("error uploding image",error)
 return{
    error:"error uploading image"
 }
    }

}else{
    console.log("no image file provided or file is invalid")
}
// create room
const newRoom = await databases.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
    ID.unique(),
    {
        user_id: user.id,
        name: formData.get("name"),
        description: formData.get("description"),
        sqft: formData.get("sqft"),
        capacity: formData.get("capacity"),
        location: formData.get("location"),
        address: formData.get("address"),
        availability: formData.get("availability"),
        price_per_hour: formData.get("price_per_hour"),
        amenities: formData.get("amenities"),
        image:imageID,

    }
)
revalidatePath("/","layout")
return{
    success:true
}
}catch(error){
    const errorMessage = error.response.message || "an unexpected error has occured"
  console.log(error)
  return{
    error: errorMessage
  }
}

}
export default createRoom