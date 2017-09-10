'use strict'

// packages
const protobuf = require('protobufjs')
const uuid = require('uuid')

/**
 * Handler for placing a buy order on the markets service
 * @param method
 * @param requestData
 * @param callback
 * @returns {*}
 */
function placeBuyOrderHandler (method, requestData, callback) {
	// TODO: call service to execute
	const responseData = requestData
	return callback(null, responseData)
}

protobuf.load('./artiz_message.proto', (err, root) => {
	if (err) throw err
	
	const markets = root.lookupEnum('Market').values
	
	const ArtizMarkets = root.lookup('Artiz_Markets')
	const artizMarkets = ArtizMarkets.create(placeBuyOrderHandler, false, false)
	
	artizMarkets.placeBuyOrder({
		buyOrder: {
			uuid: uuid.v4(),
			market: markets.BTC_ETH
		}
	}).then(response => {
		console.log('buy_order', response)
	}).catch(console.error)
})
