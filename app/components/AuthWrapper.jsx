"use client"
import { AuthProvider } from '../context/authContext'

import React from 'react'

export default function AuthWrapper({children}) {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  )
}
