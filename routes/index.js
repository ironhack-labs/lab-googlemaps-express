const express = require('express');
const router  = express.Router();
const Restaurant = require('../models/restaurant');

// GET => render the form to create a new restaurant
router.get('/new', (req, res, next) => {
  res.render('restaurants/new');
});

// POST => to create new restaurant and save it to the DB
router.post('/', (req, res, next) => {
  // add location object here
  

	const newRestaurant = new Restaurant({
		name: req.body.name,
		description: req.body.description
	});

	newRestaurant.save((error) => {
		if (error) { 
			next(error); 
		} else { 
			res.redirect('/restaurants');
		}
	});
});

// GET => to retrieve all the restaurants from the DB
router.get('/', (req, res, next) => {
	Restaurant.find({},(error, restaurantsFromDB) => {
		if (error) { 
			next(error); 
		} else { 
			res.render('restaurants/index', { restaurants: restaurantsFromDB });
		}
	});
});

// GET => get the form pre-filled with the details of one restaurant
router.get('/:restaurant_id/edit', (req, res, next) => {
	Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
		if (error) {
			next(error);
		} else {
			res.render('restaurants/update', { restaurant });
		}
	});
});

// POST => save updates in the database
router.post('/:restaurant_id', (req, res, next) => {
	Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
		if (error) { 
      next(error); 
    } else {
			restaurant.name        = req.body.name;
			restaurant.description = req.body.description;
			restaurant.save(error => {
				if (error) { 
					next(error); 
				} else { 
					res.redirect(`/restaurants/${req.params.restaurant_id}`); 
				}
			});
		}
	});
});

// DELETE => remove the restaurant from the DB
router.get('/:restaurant_id/delete', (req, res, next) => {
	Restaurant.remove({ _id: req.params.restaurant_id }, function(error, restaurant) {
		if (error) {
			next(error);
		} else {
			res.redirect('/restaurants');
		}
	});
});


// to see raw data in your browser, just go on: http://localhost:3000/api
router.get('/api', (req, res, next) => {
	Restaurant.find({}, (error, allRestaurantsFromDB) => {
		if (error) { 
			next(error); 
		} else { 
			res.status(200).json({ restaurants: allRestaurantsFromDB });
		}
	});
});

// to see raw data in your browser, just go on: http://localhost:3000/api/someIdHere
router.get('/api/:id', (req, res, next) => {
	let restaurantId = req.params.id;
	Restaurant.findOne({_id: restaurantId}, (error, oneRestaurantFromDB) => {
		if (error) { 
			next(error) 
		} else { 
			res.status(200).json({ restaurant: oneRestaurantFromDB }); 
		}
	});
});

// GET => get the details of one restaurant
router.get('/:restaurant_id', (req, res, next) => {
	Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
		if (error) {
			next(error);
		} else {
			res.render('restaurants/show', { restaurant: restaurant });
		}
	});
});

module.exports = router;
