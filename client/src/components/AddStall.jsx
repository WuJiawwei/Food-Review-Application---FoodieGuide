import React, { useContext, useState } from 'react'
import StallFinder from '../apis/StallFinder'
import { StallsContext } from '../context/StallsContext'

const AddStall = () => {
  const {addStalls} = useContext(StallsContext)
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState("Price Range")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await StallFinder.post("/", {
            name,
            location,
            price_range: priceRange
        })
        addStalls(response.data.data.stall)
        console.log(response)
    } catch (err) {}
  }
  return (
    <div className='mb-4'>
        <form action=''>
            <div className="row align-items-center">
                <div className="col">
                    <input 
                      value={name} 
                      onChange={e => setName(e.target.value)} 
                      type="text" 
                      className='form-control'
                      placeholder='name' />
                </div>
                <div className="col">
                    <input 
                      value={location} 
                      onChange={e => setLocation(e.target.value)} 
                      type="text" 
                      className='form-control'
                      placeholder='location' />
                </div>
                <div className="col">
                    <select
                      value={priceRange} 
                      onChange={e => setPriceRange(e.target.value)} 
                      className='custom-select my-1 mr-sm-2'
                    >
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <div className='col'>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default AddStall