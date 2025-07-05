const express = require('express');
const app = express();  
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();
const { addcar, editCar, deleteCar, getAllCars, searchCars, getCarById, searchCarsByMake } = require('../controller/admin.controller');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



router.post('/add-car', addcar);
router.put('/edit-car/:id', editCar);
router.delete('/delete-car/:id', deleteCar);
router.get('/get-cars', getAllCars);
router.get('/get-car/:id', getCarById);
router.get('/search-cars', searchCars);
router.get('/search-cars-by-make', searchCarsByMake);






app.get('/profile', (req, res) => { 
  res.send(`Welcome to your profile, ${req.user.username}`);
 });


 module.exports = router;