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
        const results = await db.query("select * from stalls")
        
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                stalls: results.rows,
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
      const results = await db.query("select * from stalls where id = $1", [req.params.id])
      res.status(200).json({
        status: "success",
        data: {
            stall: results.rows[0],
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

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is ready on port ${port}`)
})

