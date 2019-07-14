const faker = require('faker')

module.exports = function(env) {
	/**
	 * Instantiate object used to store the methods registered as a
	 * 'filter' (of the same name) within nunjucks. You can override
	 * gov.uk core filters by creating filter methods of the same name.
	 * @type {Object}
	 */
	var filters = {}

	/* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

	/* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */

	filters.productName = () => {
		return faker.company.bsNoun()
	}

	const separateThousandsWithComma = input => {
		let amount = Math.round(Number(input) * 100) / 100
		if (amount % 1 !== 0) {
			amount = amount.toFixed(2)
		}
		return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}

	const toFriendlyNumber = input => {
		if (input == 0 || input == '0' || !input) {
			return 'None'
		} else {
			return separateThousandsWithComma(input)
		}
	}

	filters.currency = (number, prefix) => {
		if (!prefix) {
			prefix = '£'
		}
		return prefix + separateThousandsWithComma(number)
	}

	filters.friendlyNumber = input => {
		return toFriendlyNumber(input)
	}

	// Render numeric date as month string e.g. '04' becomes 'April'

	const numberToMonthString = input => {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		]
		return months[Number(input)]
	}

	filters.formatDate = str => {
		const date = new Date(str)
		return (
			date.getDate() +
			' ' +
			numberToMonthString(date.getMonth()) +
			' ' +
			date.getFullYear() +
			' at ' +
			('0' + (Math.round(date.getHours() / 2.4) + 7)).slice(-2) +
			':' +
			('0' + date.getMinutes()).slice(-2)
		)
	}

	filters.simpleDate = str => {
		const date = new Date(str)
		return (
			date.getDate() +
			' ' +
			numberToMonthString(date.getMonth()) +
			' ' +
			date.getFullYear()
		)
	}

	filters.getProductById = (products, id) => {
		return products.find(product => product.id == id)
	}

	filters.clientSecret = () => {
		return faker.random.uuid()
	}

	filters.formatColumnDate = str => {
		const date = new Date(str)
		return (
			('0' + (Math.round(date.getHours() / 2.4) + 7)).slice(-2) +
			':' +
			('0' + date.getMinutes()).slice(-2) +
			' on ' +
			date.getDate() +
			' ' +
			numberToMonthString(date.getMonth()) +
			' ' +
			date.getFullYear()
		)
	}

	filters.friendlyDate = (str, nowStr) => {
		const date = new Date(str)
		const now = new Date(nowStr)
		const secondsPassed = (now - date) / 1000
		if (secondsPassed < 15) {
			return 'just now'
		} else if (secondsPassed < 60) {
			return 'less than a minute ago'
		} else if (secondsPassed < 75) {
			return 'a minute ago'
		} else if (secondsPassed < 60 * 4) {
			return 'a few minutes ago'
		} else if (secondsPassed < 60 * 59) {
			return Math.floor(secondsPassed / 60) + ' minutes ago'
		} else if (
			secondsPassed < 60 * 60 * 24 &&
			now.getDate() === date.getDate()
		) {
			return (
				'today at ' +
				('0' + (Math.round(date.getHours() / 2.4) + 7)).slice(-2) +
				':' +
				('0' + date.getMinutes()).slice(-2)
			)
		} else {
			return (
				('0' + (Math.round(date.getHours() / 2.4) + 7)).slice(-2) +
				':' +
				('0' + date.getMinutes()).slice(-2) +
				' ' +
				date.getDate() +
				' ' +
				numberToMonthString(date.getMonth()) +
				' ' +
				date.getFullYear()
			)
		}
	}

	filters.orElse = (str, fallback) => {
		if (!str || str == '') {
			return fallback
		}
		return str
	}

	filters.addElement = (array, element) => {
		if (Array.isArray(array)) {
			array = JSON.parse(JSON.stringify(array))
			array.push(element)
			return array
		}
		return [element]
	}

	filters.month = number => numberToMonthString(number - 1)

	filters.lowerCase = str => str.toLowerCase()

	filters.upperCase = str => str.toUpperCase()

	filters.titleCase = str => {
		return str.replace(/\w\S*/g, txt => {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
		})
	}

	filters.sentenceCase = str => {
		return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()
	}

	filters.numbersOnly = str =>
		str
			.toString()
			.match(/\d+/g)
			.join('')

	filters.urlSafe = str => encodeURIComponent(str)

	filters.contains = (test, str) => {
		if (test) {
			return test.includes(str)
		} else {
			return false
		}
	}

	filters.arrayContains = (arrayAsString, str) => {
		if (arrayAsString) {
			const array = arrayAsString + ''.split(',')
			return array.includes(str)
		} else {
			return false
		}
	}

	filters.stringSum = arrayOfStrings => {
		var output = 0
		arrayOfStrings.forEach(str => {
			parseFloat(str) ? (output += parseFloat(str)) : false
		})
		return toFriendlyNumber(output)
	}

	return filters
}
