const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

/* GET home page. */
router.get('/', (req, res, next) => {
	Restaurant.find((error, restaurants) => {
		if (error) { next(error) } 
		else { res.render('restaurants/index', { restaurants })}
	})
})

router.post('/', (req, res, next) => {
	let location = {
		type: 'Point',
		coordinates: [req.body.longitude, req.body.latitude]
	};
	const newRestaurant = new Restaurant({
		name:        req.body.name,
		description: req.body.description,
		location:    location
	});
	newRestaurant.save((error) => {
		if (error) { next(error) }
		else { res.redirect('/');
		}
	})
});

router.get('/api', (req, res, next) => {
	Restaurant.find((error, restaurants) => {
		if (error) { next(error) } 
		else { res.status(200).json({ restaurants })}
	})
})

router.get('/api/:id', (req, res, next) => {
	let restaurantId = req.params.id;
	Restaurant.findOne({_id: restaurantId}, (error, restaurant) => {
		if (error) { next(error) } 
		else { res.status(200).json({ restaurant }) }
	})
})

router.get('/new', (req, res, next) => {
		res.render('restaurants/new');
});

router.get('/:restaurant_id', (req, res, next) => {
		Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
			if (error) {
				next(error);
			} else {
				res.render('restaurants/show', {restaurant});
			}
		})
})

router.post('/:restaurant_id', (req, res, next) => {
		Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
			if (error) { next(error) } 
			else {
				restaurant.name        = req.body.name;
				restaurant.description = req.body.description;
				restaurant.save((error) => {
					if (error) { next(error) } 
					else { res.redirect('/') }
		  	})
			}
		})
	});


router.get('/:restaurant_id/edit', (req, res, next) => {
	Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
		if (error) {
			next(error);
		} else {
			res.render('restaurants/update', { restaurant });
		}
	})
});

router.get('/:restaurant_id/delete', (req, res, next) => {
	Restaurant.remove({ _id: req.params.restaurant_id }, function(error, restaurant) {
		if (error) {
			next(error)
		} else {
			res.redirect('/')
		}
	});
});

module.exports = router;
