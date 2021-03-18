const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userModel = require('./models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const cors = require("cors")
const expressValidator = require('express-validator')
const passwordValidator = require('password-validator')
const port = ('8000')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => {
    console.log('Server connected')
})
mongoose.connect('mongodb://localhost:27017/login', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('db connected')
})

app.post('/signup',
    expressValidator.body('email').isEmail(),
    expressValidator.body('password').custom((value) => {
        const schema = new passwordValidator();
        schema
            .is().min(8)
            .has().uppercase()
            .has().digits()
    }),
    async (req, res) => {
        try {
            const AlreadyRegistered = await userModel.findOne({
                email: req.body.email
            });
            if (AlreadyRegistered) {
                res.status(400).json({
                    error: 'User already registered'
                })
                return;
            }
            if (req.body.password !== req.body.confirmPassword) {
                res.status(400).json({
                    error: 'Passwords do not match '
                })
                return;
            }
            await userModel.create({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
                firstName: req.body.firstName,
                surname: req.body.surname,
                birthday: req.body.birthday,
            })
            res.send("User created");
        } catch (error) {
            console.log(error)
            res.status(500).send("Error")
        }
    })

    app.post("/login", async (req, res) => {
        try {
            const user = await userModel.findOne({
                email: req.body.email
            })
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({
                    id: user._id
                }, config.secret, {
                    expiresIn: 7200
                })
                res.status(200).json({
                    message: "Connected",
                    token: token
                })
            } else {
                res.status(401).send("Wrong id")
            }
        } catch (error) {
            res.send("Erreur")
        }
    })