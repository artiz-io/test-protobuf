'use strict'

class Message
{
	constructor (Type, payload)
	{
		this._Type = Type
		this._payload = payload
		this._message = null
		this._encodedMessage = null
		this._isValid = false
		this._error = null
	}
	
	generate ()
	{
		return this._verify()._create()._encode().getBuffer()
	}
	
	getType ()
	{
		if (!this._Type) return
		return this._Type.name
	}
	
	getOriginalType ()
	{
		return this._Type
	}
	
	getOriginalPayload ()
	{
		return this._payload
	}
	
	getMessage ()
	{
		return this._message
	}
	
	isValid ()
	{
		return this._isValid
	}
	
	getBuffer ()
	{
		if (!this._encodedMessage) return
		return this._encodedMessage.finish()
	}
	
	_verify ()
	{
		if (!this._payload) return this
		const errorMessage = this._Type.verify(this._payload)
		if (errorMessage) {
			this._error = new Error(errorMessage)
			throw this._error
		} else {
			this._isValid = true
		}
		return this
	}
	
	_create ()
	{
		if (!this._isValid || !this._payload) return this
		const message = this._Type.create(this._payload)
		if (message) this._message = message
		return this
	}
	
	_encode ()
	{
		if (!this._message) return this
		const encodedMessage = this._Type.encode(this._message)
		if (encodedMessage) this._encodedMessage = encodedMessage
		return this
	}
}

module.exports = Message
