'use strict'

// packages
const protobuf = require('protobufjs')
const uuid = require('uuid')
const Message = require('./message')

const root = protobuf.loadSync('./Artiz.proto')

// types
const BuyOrder = root.lookupType('Artiz.BuyOrder')
const MARKETS = root.lookupEnum('Artiz.Market')

// test
placeBuyOrder()

function placeBuyOrder () {
	
	const message = new Message(BuyOrder, {
		uuid: uuid.v4(),
		market: MARKETS.values.BTC_ETH
	})
	
	console.log('buffer', message.generate())
	
	// console.log('buffer', message.getBuffer())
	// console.log('payload', message.getOriginalPayload())
	// console.log('type', message.getType())
	// console.log('valid', message.isValid())
	// console.log('message', message.getMessage())
	
	// TODO: send
}
