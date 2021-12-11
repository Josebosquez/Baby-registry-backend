const User = require("../model/User");
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const dbErrorHelper = require('../lib/dbErrorHelper')
const jwt = require('jsonwebtoken')

const uuidv4 = uuid.v4

module.exports = {
    createUser: async (req, res) => {
        console.log(req.body);
        try {
            console.log('creating user');

            let createdUser = await new User({
                id: uuidv4(),
                email: req.body.email,
                password: req.body.password,
                dueDate: req.body.dueDate,
                fName: req.body.fName,
                lName: req.body.lName,
                sFName: req.body.sFName,
                sLName: req.body.sLName,
                babyGender: req.body.babyGender,
            })

            let genSalt = await bcrypt.genSalt(12)
            let hashedPassword = await bcrypt.hash(createdUser.password, genSalt)
            createdUser.password = hashedPassword

            await createdUser.save()

            res.json({
                message: "User Created"
            })
        } catch (e) {
            if (e.status === 409) {
                res.status(e.status).json({
                    message: e.message
                })
            } else
                res.status(500).json({ message: dbErrorHelper(e) })
        }
    },

    login: async (req, res) => {
        try {

            let foundUser = await User.findOne({ email: req.body.email })

            if (!foundUser) {
                throw Error('user not found, please sign up!')
            }

            let comparedPassword = await bcrypt.compare(req.body.password, foundUser.password);


            if (!comparedPassword) {
                throw Error('check email and/or password')
            }

            let jwtToken = jwt.sign({
                email: foundUser.email,
            }, process.env.JWT_USER_SECRET_KEY
            )
            console.log(jwtToken)


            
            res.json({
                message: `Welcome back ${foundUser.email}`, payload: foundUser,
            })
        } catch (e) {
            res.status(500).json({ message: dbErrorHelper(e) });
        }
    }
}