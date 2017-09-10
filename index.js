'use strict'

// packages
const protobuf = require('protobufjs')
const uuid = require('uuid')

const root = protobuf.loadSync('./artiz_message.proto')
const markets = root.lookupEnum('Market')
const ArtizMarkets = root.lookup('ArtizMarkets')
const PlaceBuyOrderRequest = root.lookup('PlaceBuyOrderRequest')
const PlaceBuyOrderResponse = root.lookup('PlaceBuyOrderResponse')

/**
 * Handler for placing a buy order on the markets service
 * @param method
 * @param requestData
 * @param callback
 * @returns {*}
 */
function placeBuyOrderHandler (method, requestData, callback) {
	performRequestOverTransportChannel(requestData, (err, responseData) => {
		if (err) return callback(err)
		return callback(null, responseData)
	})
}

function performRequestOverTransportChannel (requestData, callback) {
	
	const request = PlaceBuyOrderRequest.decodeDelimited(requestData)
	
	const response = {
		buyOrder: request.buyOrder,
		timestamp: new Date().toISOString(),
		status: 'queued'
	}
	
	const responseData = PlaceBuyOrderResponse.encodeDelimited(response).finish()
	
	setTimeout(() => {
		callback(null, responseData)
	}, 500)
	
}

ArtizMarkets.create(placeBuyOrderHandler, true, true).placeBuyOrder({
	buyOrder: {
		uuid: uuid.v4(),
		market: markets.valuesById[0]
	}
}).then(response => {
	console.log('place_buy_order', response)
}).catch(console.error)
