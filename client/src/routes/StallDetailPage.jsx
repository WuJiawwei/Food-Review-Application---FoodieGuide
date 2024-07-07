import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { StallsContext } from '../context/StallsContext'
import StallFinder from '../apis/StallFinder'
import StarRating from '../components/StarRating'
import Reviews from '../components/Reviews'
import AddReview from '../components/AddReview'

const StallDetailPage = () => {
  const {id} = useParams()
  const {selectedStall, setSelectedStall} = useContext(StallsContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StallFinder.get(`/${id}`)
        setSelectedStall(response.data.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  return (
    <div>
      {selectedStall && (
      <>
      <h1 className='text-center display-1'>
        {selectedStall.stall.name}
      </h1>
        <div className="mt-3">
          <Reviews reviews={selectedStall.reviews} />
        </div>
        <AddReview />
      </>
    )}</div>
  )
}

export default StallDetailPage