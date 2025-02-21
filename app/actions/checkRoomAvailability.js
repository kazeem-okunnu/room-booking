"use server"
import { createSessionClient } from "@/data/config/appwrite"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Query } from "node-appwrite"
import { DateTime } from "luxon"

//convert a date string to a luxn date time object in utc
function toUTCDateTime(dateString) {
    return DateTime.fromISO(dateString, { zone: "utc" }).toUTC
}
//check for overlapping date ranges

function dateRangesOverlap(checkInA, checkOutA, checkInB, checkOutB) {
    return checkInA < checkOutB && checkOutA > checkInB
}


async function checkRoomAvailability(roomId, checkIn, checkOut) {
    const sessionCookie = cookies().get("appwrite-session")
    if (!sessionCookie) {
        redirect("/login")
    }
    try {
        const { databases } = await createSessionClient(sessionCookie.value)

        const checkInDateTime = toUTCDateTime(checkIn)
        const checkOutDateTime = toUTCDateTime(checkOut)

        //fetch all bookings for a given room
        const { documents: bookings } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
            [Query.equal("room_id", roomId)]

        );
        //loop over bookings and check for overlaps
        for (const booking of bookings) {
            const bookingCheckInDateTime = toUTCDateTime(booking.check_in)
            const bookingCheckOutDateTime = toUTCDateTime(booking.check_Out)

            if (dateRangesOverlap(
                checkInDateTime, checkOutDateTime,
                bookingCheckInDateTime, bookingCheckOutDateTime
            )) {
                return false // overlap found, do not book
               
            }
        }
        //no overlap found, continue to book
        return true

    } catch (error) {
        console.log(error, "failded to check availability of room")
        return {
            error: "failed to check availability of room"
        }
    }
}

export default checkRoomAvailability