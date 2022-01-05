const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080
const config = require('config')
const mongoose = require('mongoose')
const Command = require('./models/command')
const { exec } = require('child_process')

mongoose.connect(config.get('db.url'), {useNewUrlParser: true, useUnifiedTopology: true})

const cors = require('cors')

app.use(cors())
app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({extended: true}))

app.post('/execute', (req, res) => {
    const { command } = req.body
    exec(command, (error, stdout, stderr) => {
        let c = new Command()
        c['input_command'] = command
        
        if(error || stderr){
            // console.log('Error: ', error || stderr)
            c['error'] = JSON.stringify(error || stderr)
            c.save((saveErr, saveResult) => {
                return res.status(400).json({"status": 0, "message": "Server execution error. Please try again later"})
            })
        }else{
            c['output_result'] = JSON.stringify(stdout)
            c.save((saveErr, saveResult) => {
                return res.status(200).json({"status": 1, "message": "Command ran successfully", "data": stdout})
            })
        }
    })
})

app.listen(port)
console.log('Server running on port:', port)
module.exports = app