import React, { useContext, useEffect } from 'react'
import StallFinder from '../apis/StallFinder'
import { StallsContext } from '../context/StallsContext';

const StallList = (props) => {
    const {stalls, setStalls} = useContext(StallsContext)
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
                <tr>
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
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default StallList