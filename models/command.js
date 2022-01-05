const mongoose = require('mongoose')

let commandSchema = mongoose.Schema({
	input_command: String,
	output_result: String,
	error: String
}, {timestamps: true})

module.exports = mongoose.model('Command', commandSchema)