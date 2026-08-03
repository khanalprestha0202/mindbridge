const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  name: String,
  city: String,
  keys: [String],
  fact: String,
  links: [{ label: String, url: String, desc: String }],
});

const CountrySchema = new mongoose.Schema({
  key: String,
  flag: String,
  fact: String,
  embassy: { name: String, url: String },
  orgs: [{ name: String, url: String }],
});

const University = mongoose.models.University || mongoose.model('University', UniversitySchema);
const Country = mongoose.models.Country || mongoose.model('Country', CountrySchema);

// Get all universities
router.get('/universities', async (req, res) => {
  try {
    const universities = await University.find({});
    res.json(universities);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Search universities
router.get('/universities/search', async (req, res) => {
  try {
    const { q } = req.query;
    const universities = await University.find({
      keys: { $elemMatch: { $regex: q, $options: 'i' } }
    });
    res.json(universities);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all countries
router.get('/countries', async (req, res) => {
  try {
    const countries = await Country.find({});
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Search countries
router.get('/countries/search', async (req, res) => {
  try {
    const { q } = req.query;
    const countries = await Country.find({
      key: { $regex: q, $options: 'i' }
    });
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;