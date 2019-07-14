const express = require('express')
const router = express.Router()
const faker = require('faker')

// Add your routes here - above the module.exports line

router.post('/register-product', (req, res) => {
	const newProductID = faker.random.alphaNumeric(33)
	req.session.data.products.push({
		id: newProductID,
		name: req.session.data['product-name'],
		email: req.session.data['product-email'],
		urls: req.session.data['redirect-url'],
		createdOn: new Date()
	})
	req.session.data['selected-product'] = newProductID
	res.redirect(
		req.header('Referrer').substr(0, req.headers.referer.lastIndexOf('/') + 1) +
			'client-secret'
	)
})

module.exports = router
