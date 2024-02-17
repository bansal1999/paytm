import React from 'react'
import { Users } from '../components/Users'
import { Appbar } from '../components/Appbar'
import {Balance} from '../components/Balance'

export const Dashboard = () => {
  return (
    <>
      <Appbar/>
      <div>
        <Balance value={"10000"}/>
        <Users/>
      </div>
   </>
  )
}
