const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

/* GET home page. */
router.route('/')
	.get((req, res, next) => {
	  Restaurant.find({}, (error, restaurants) => {
	  	if (error) {
	  		next(error);
	  	} else {
				restaurants.forEach(restaurant => restaurant._id = restaurant._id)
	  		res.render('restaurants/index', { restaurants, myRestaurants: [] });
	  	}
	  })
	})
  .post((req, res, next) => {
		let location = {
			type: 'Point',
			coordinates: [req.body.longitude, req.body.latitude]
		};
    const newRestaurant = {
      name:        req.body.name,
      description: req.body.description,
			location:    location
    };

  	const restaurant = new Restaurant(newRestaurant);

  	restaurant.save((error) => {
  		if (error) {
  			next(error);
  		} else {
  			res.redirect('/');
  		}
  	})

  });


router.route('/new')
	.get((req, res, next) => {
		res.render('restaurants/new');
	});

router.route('/:restaurant_id')
	.get((req, res, next) => {
		Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
			if (error) {
				next(error);
			} else {
				res.render('restaurants/show', {restaurant});
			}
		})
	})
	.post((req, res, next) => {
		Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
			if (error) {
				next(error);
			} else {
				restaurant.name        = req.body.name;
				restaurant.description = req.body.description;
				restaurant.save((error) => {
		  		if (error) {
		  			next(error);
		  		} else {
		  			res.redirect('/');
		  		}
		  	})
			}
		})
	});

router.route('/:restaurant_id/edit')
	.get((req, res, next) => {
		Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
			if (error) {
				next(error);
			} else {
				res.render('restaurants/update', { restaurant });
			}
		})
	});

router.route('/:restaurant_id/delete')
	.get((req, res, next) => {
		Restaurant.remove({ _id: req.params.restaurant_id }, function(error, restaurant) {
	    if (error) {
	    	next(error)
	    } else {
	    	res.redirect('/')
	    }
    });
	});


module.exports = router;
