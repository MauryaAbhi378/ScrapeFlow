"use client"

import { ParamProps } from '@/types/appNode';
import React from 'react'

export default function BrowserInstanceParam({param} : ParamProps) {
  return (
   <p className="react-xs">{param.name}</p>
  )
}
