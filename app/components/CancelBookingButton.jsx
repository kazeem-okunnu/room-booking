"use client"
import React from 'react'
import cancelBooking from '../actions/cancelBooking'
import { toast } from 'react-toastify'

export default function CancelBookingButton({bookingId}) {
    const handleCancelClick = async () =>{
  if(!confirm("Are you sure you want to cancel this booking?")){
    return
  }
  try {
     const result = await cancelBooking(bookingId)
     if(result.success){
   toast.success("Booking cancel successfully")
     }
  } catch (error) {
    console.log("filed to cancel booking",error)
    return{
        error:"failed to cancel booking"
    }
  }
    }
  return (
    <button
    onClick={handleCancelClick}
    className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
  >
    Cancel Booking
  </button>
  )
}
