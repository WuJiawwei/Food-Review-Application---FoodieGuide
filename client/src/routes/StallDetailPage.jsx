import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { StallsContext } from '../context/StallsContext'
import StallFinder from '../apis/StallFinder'

const StallDetailPage = () => {
  const {id} = useParams()
  const {selectedStall, setSelectedStall} = useContext(StallsContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StallFinder.get(`/${id}`)
        setSelectedStall(response.data.data.stall)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  return (
    <div>{selectedStall && selectedStall.name}</div>
  )
}

export default StallDetailPage