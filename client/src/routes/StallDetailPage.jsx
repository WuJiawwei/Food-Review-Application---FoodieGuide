import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { StallsContext } from '../context/StallsContext'
import StallFinder from '../apis/StallFinder'
import StarRating from '../components/StarRating'
import Reviews from '../components/Reviews'

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
    <div>{selectedStall && (
      <>
        <div className="mt-3">
          <Reviews />
        </div>
      </>
    )}</div>
  )
}

export default StallDetailPage