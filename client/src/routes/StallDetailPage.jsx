import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { StallsContext } from '../context/StallsContext'
import StallFinder from '../apis/StallFinder'
import StarRating from '../components/StarRating'

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
    <div>{selectedStall && selectedStall.name}<StarRating rating={3.3} /></div>
  )
}

export default StallDetailPage