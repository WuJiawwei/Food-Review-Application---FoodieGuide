import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import StallFinder from '../apis/StallFinder'
import { StallsContext } from '../context/StallsContext';

const StallList = (props) => {
    const {stalls, setStalls} = useContext(StallsContext)
    let navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await StallFinder.get("/");
            console.log(response.data.data);
            setStalls(response.data.data.stalls)
          } catch (err) {}
        };
    
        fetchData();
      }, []);

const handleDelete = async (e, id) => {
    e.stopPropagation()
    try {
        const response = await StallFinder.delete(`/${id}`)
        setStalls(stalls.filter(stall => {
            return stall.id !== id
        }))
    } catch (err) {
        console.log(err)
    }
}

const handleUpdate = (e, id) => {
    e.stopPropagation()
    navigate(`/stalls/${id}/update`)
}

const handleStallSelect = (id) => {
    navigate(`/stalls/${id}`)
}

  return (
    <div className='list-group'>
        <table className="table table-hover table-dark">
            <thead>
                <tr className="bg-primary">
                    <th scope="col">Stall</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {stalls && stalls.map(stall => {
                    return (
                        <tr onClick={() => handleStallSelect(stall.id)} key={stall.id}>
                        <td>{stall.name}</td>
                        <td>{stall.location}</td>
                        <td>{"$".repeat(stall.price_range)}</td>
                        <td>reviews</td>
                        <td>
                          <button onClick={(e) => handleUpdate(e, stall.id)} className="btn btn-warning">Update</button>
                        </td>
                        <td>
                          <button onClick={(e) => handleDelete(e, stall.id)} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                    )                   
                })}
                
                {/* <tr>
                    <td>Salad</td>
                    <td>Utown</td>
                    <td>$$$$$</td>
                    <td>Rating</td>
                    <td><button className="btn btn-warning">Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr>

                <tr>
                    <td>Salad</td>
                    <td>Utown</td>
                    <td>$$$$$</td>
                    <td>Rating</td>
                    <td><button className="btn btn-warning">Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr> */}
            </tbody>
        </table>
    </div>
  )
}

export default StallList