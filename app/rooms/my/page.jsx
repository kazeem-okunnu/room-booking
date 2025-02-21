import React from 'react'
import getMyRooms from '@/app/actions/getMyRooms'
import Heading from '@/app/components/Heading'
import MyRoomCard from '@/app/components/MyRoomCard'


export default async function MyRoomsPage() {
    const rooms = await getMyRooms()
  return (
    <>
    <Heading title="My Rooms"/>
    {rooms.length>0?(
      rooms.map((room)=>(<MyRoomCard key={room.$id} room={room}/>))
    ):(
        <p>You have no room listings</p>
    )}
    </>
  )
}
