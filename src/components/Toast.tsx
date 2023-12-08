"use client"

import React from 'react'
import { toast } from 'sonner'

function Toast({type, message}: {type: "info" | "error" | "success" | "pending", message: string}) {
  if (type === "info") toast.info(message) 
  if (type === "error") toast.error(message) 
  if (type === "success") toast.success(message) 
  if (type === "pending") toast.loading(message) 
  return (
    <></>
  )
}

export default Toast