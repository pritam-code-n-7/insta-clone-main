'use server' 

import React from 'react'

import Body from '@/demo/body-demo/Body'
import Header from '@/demo/header-demo/Header'

function page() {
  return (
    <div>
      <Header />
      <Body />
    </div>
  )
}

export default page