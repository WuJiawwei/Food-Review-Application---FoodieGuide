require('dotenv').config()
const express = require('express')
const db = require("./db")
const cors = require("cors")

const morgan = require("morgan")
const app = express()

app.use(cors())
app.use(express.json())

// Get all stalls
app.get("/api/v1/stalls", async (req, res) => {
    try {
        // const results = await db.query("select * from stalls")
        const stallRatingsData = await db.query (
            "select * from stalls left join (select stall_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by stall_id) reviews on stalls.id = reviews.stall_id;"
        )
        
        res.status(200).json({
            status: "success",
            results: stallRatingsData.rows.length,
            data: {
                stalls: stallRatingsData.rows,
            },
        })
    } catch (err) {
        console.log(err)
    }  
})

// Get one stall
app.get("/api/v1/stalls/:id", async (req, res) => {
    console.log(req.params.id)
    try {
      const stall = await db.query(
        "select * from stalls left join (select stall_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by stall_id) reviews on stalls.id = reviews.stall_id where id = $1", [
        req.params.id
      ])

      const reviews = await db.query(
        "select * from reviews where stall_id = $1", [
        req.params.id
      ])
      
      res.status(200).json({
        status: "success",
        data: {
            stall: stall.rows[0],
            reviews: reviews.rows
        }
    })
    } catch (err) {
      console.log(err)
    }
})

// Create a stall
app.post("/api/v1/stalls", async (req, res) => {
    console.log(req.body)
    try {
        const results = await db.query(
            "INSERT INTO stalls (name, location, price_range) values ($1, $2, $3) returning *", 
            [req.body.name, req.body.location, req.body.price_range]
        )
        console.log(results)
        res.status(201).json({
            status: "success",
            data: {
                stall: results.rows[0],
            }
        })
    } catch (err) {
      console.log(err)
    }
})

// Update stalls
app.put("/api/v1/stalls/:id", async (req, res) => {
    try {
        const results = await db.query(
            "UPDATE stalls SET name = $1, location = $2, price_range = $3 where id = $4 returning *", 
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
        )

        res.status(200).json({
            status: "success",
            data: {
                stall: results.rows[0],
            }
        })
    } catch (err) {
        console.log(err)
    }
    console.log(req.params.id)
    console.log(req.body)
})

// Delete stalls
app.delete("/api/v1/stalls/:id", async (req, res) => {
    try {
        const results = db.query("DELETE FROM stalls where id = $1", [req.params.id])
        res.status(204).json({
            status: "success",
        })
    } catch (err) {
        console.log(err)
    }
    
})

app.post("/api/v1/stalls/:id/addReview", async (req, res) => {
    try {
        const newReview = await db.query("INSERT INTO reviews (stall_id, name, review, rating) values ($1, $2, $3, $4) returning * ;", [
            req.params.id, req.body.name, req.body.review, req.body.rating])
            res.status(201).json({
                status: 'success',
                data: {
                    review: newReview.rows[0]
                }
            })
    } catch (err) {
        console.log(err)
    }
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is ready on port ${port}`)
})

