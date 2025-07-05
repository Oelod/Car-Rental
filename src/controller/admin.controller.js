const car = require('../model/car.schema'); // Adjust the path as necessary
const Car = require('../model/car.schema'); // Assuming you have a Car model to handle database operations


const addcar = async (req, res) => {
    try {
        const carData = req.body;
        // Assuming you have a Car model to handle database operations
        const newCar = await Car.create(carData);
        res.status(201).json({ message: 'Car added successfully', car: newCar });
    } catch (error) {
        res.status(500).json({ message: 'Error adding car', error: error.message });
    }
};

const getAllCars = async (req, res) => {
    try {
        // Assuming you have a Car model to handle database operations
        const cars = await Car.find();
        res.status(200).json({ message: 'Cars retrieved successfully', cars });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cars', error: error.message });
    }
};

const getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({ message: 'Car retrieved successfully', car });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving car', error: error.message });
    }
};

const editCar = async (req, res) => {
    try {
        const { id } = req.params;
        const carData = req.body;
        const editedCar = await Car.findByIdAndUpdate(id, carData, { new: true });
        if (!editedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({ message: 'Car updated successfully', car: updatedCar });
    } catch (error) {
        res.status(500).json({ message: 'Error updating car', error: error.message });
    }
};

const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCar = await Car.findByIdAndDelete(id);
        if (!deletedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting car', error: error.message });
    }
};

const searchCars = async (req, res) => {
    try {
        const { make, model, year, price } = req.query;
        const query = {};
        if (make) query.make = make;
        if (model) query.model = model;
        if (year) query.year = year;
        if (price) query.price = { $lte: price }; // Assuming price is a number

        const cars = await Car.find(query);
        res.status(200).json({ message: 'Cars retrieved successfully', cars });
    } catch (error) {
        res.status(500).json({ message: 'Error searching cars', error: error.message });
    }
};

    const searchCarsByMake = async (req, res) => {
        try {
            const { make } = req.query;
            if (!make) {
                return res.status(400).json({ message: 'Make query parameter is required' });
            }
            const cars = await Car.find({ make: new RegExp(make, 'i') }); // Case-insensitive search
            res.status(200).json({ message: 'Cars retrieved successfully', cars });
        } catch (error) {
            res.status(500).json({ message: 'Error searching cars by make', error: error.message });
        }
    };




module.exports = {
    addcar,
    getAllCars,
    getCarById,
    editCar,
    deleteCar,
    searchCars,
    searchCarsByMake
};
