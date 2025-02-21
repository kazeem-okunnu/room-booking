import Image from "next/image";
import getAllRooms from "./actions/getAllRooms";
import RoomCard from "./components/RoomCard";
import Heading from "./components/Heading";


export default async function Home() {
  const rooms = await getAllRooms()
  return (
    <>
    <Heading title="Availabe Rooms"/>
     {rooms.length>0 ?(
      rooms.map((room)=>
      (<RoomCard key={room.$id} room={room}/>)))
      :(<p>no rooms available</p>)}
      
    </>
  );
}
