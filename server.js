const express=require('express')
const mongoose = require('mongoose');
const app=express()
require('dotenv').config()
const bodyparser=require('body-parser')
app.use(bodyparser.json())
const VinylRecord =require('./module/user')


// connection for database connect
mongoose.connect('mongodb://localhost:27017/VinylRecord')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// store the data in database
  app.post('/api/vinyl-records', (req, res) => {
    const { title, artist, year, genre, condition } = req.body;
    
    const newVinylRecord = new VinylRecord({
      title,
      artist,
      year,
      genre,
      condition,
    });
    
    newVinylRecord.save()
      .then(() => {
        res.status(201).json({ message: 'Vinyl record created successfully' });
      })
      .catch((error) => {
        res.status(400).json({ error: 'Unable to create vinyl record', details: error });
      });
    });

// fatch the data from database
    app.get('/user',(req,res)=>{

        VinylRecord.find()
        .then((VinylRecord)=>{
            res.status(200).json(VinylRecord)
        })
        .catch((error)=>{
            res.status(500).json({error:'server error',details:error})
        })
    })

//  for updating the data
    app.put('/edit/:id',(req,res)=>{
        VinylRecord.findByIdAndUpdate(req.params.id,req.body,{new:true})
        .then((updatedRecord) => {
            if (!updatedRecord) {
              return res.status(404).json({ error: 'Vinyl record not found' });
            }
            res.status(200).json({ message: 'Vinyl record updated successfully', updatedRecord });
          })
          .catch((error) => {
            res.status(500).json({ error: 'Server error', details: error });
          });
    })


// 
app.delete('/user/:id',(req,res)=>{
    VinylRecord.findByIdAndDelete(req.params.id)
    .then((deletedRecord) => {
        if (!deletedRecord) {
          return res.status(404).json({ error: 'Vinyl record not found' });
        }
        res.status(200).json({ message: 'Vinyl record deleted successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Server error', details: error });
      });
})





const PORT=process.env.PORT|| 3000;
app.listen(PORT,()=>{
    console.log("listen port is 3000")
})
