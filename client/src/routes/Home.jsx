import React from 'react'
import Header from '../components/Header'
import AddStall from '../components/AddStall'
import StallList from '../components/StallList'

const Home = () => {
  return (
    <div>
      <Header />
      <AddStall />
      <StallList />
    </div>
  )
}

export default Home