const faker = require('faker')

const sentenceCase = str => {
	return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()
}

const randomURLArray = amount => {
	return new Array(amount).fill(null).map(_ => {
		return (
			faker.internet.url().replace('http:', 'https:') +
			'/' +
			faker.internet.domainWord() +
			'/' +
			faker.internet.domainSuffix() +
			'/' +
			faker.internet.domainWord()
		)
	})
}

const createProduct = () => {
	return {
		id: faker.random.alphaNumeric(33),
		email: faker.internet.email().toLowerCase(),
		name: sentenceCase(faker.lorem.words(2)),
		urls: randomURLArray(faker.random.number({ min: 1, max: 20 })),
		createdOn: faker.date.recent(90)
	}
}

const createProducts = amount => {
	return new Array(amount).fill(null).map(_ => {
		return createProduct()
	})
}

/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {
	// Insert values here

	'company-name': faker.company.companyName(),
	products: createProducts(8)
}
