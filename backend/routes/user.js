const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Questionnaire = require('../Models/Question');


// const verifyToken = async (req, res, next) => {
//     if (!req.headers.authorization) {
//         res.status(403).json({
//             status: "Failed",
//             code: 403,
//             message: "Token not found.",
//         });
//     }
//     if (req.headers.authorization) {
//         let token = req.headers.authorization.split(" ")[1];
//         console.log(token)
//     }
//     if (!token) {
//         return res.status(403).json({
//             status: false,
//             message: "Token not found",
//         });
//     }
//     try {
//         const decoded = jwt.verify(token, 'home-care-app');

//         console.log('Token is valid', decoded.userId);
//         const user = await User.findOne({ _id: decoded.userId })
//         console.log(user)

//         if (decoded.userName !== user?.username) {
//             return res.status(401).json({
//                 status: false,
//                 message: "Not Authorized",
//             });
//         }
//         req.userId = decoded?.userId
//         req.accessToken = token
//         next()
//     } catch (error) {
//         if (error.name === 'TokenExpiredError') {
//             return res.status(401).json({
//                 statusCode: 401,
//                 status: "FAILURE",
//                 message: 'Token has expired !'
//             });
//         } else {
//             console.error('Token verification failed', error);
//             return res.status(401).json({
//                 statusCode: 401,
//                 status: "FAILURE",
//                 message: 'Authentication failed'
//             });
//         }
//     }
// };

router.get('/get', (req, res) => {
    res.send('hello world')
})


router.post('/signup', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if (validator.isEmpty(username) || validator.matches(username, /[./\[\]{}<>]/)) {
        return res.status(400).json({
            status: 'FAILURE',
            error: 'Invalid username'
        });
    }

    if (validator.isEmpty(password) || validator.matches(password, /[./\[\]{}<>]/)) {
        return res.status(400).json({
            status: 'FAILURE',
            error: 'Invalid username'
        });
    }

    if (validator.isEmpty(email) || validator.matches(email, /[/\[\]{}<>]/)) {
        return res.status(400).json({
            status: 'FAILURE',
            error: 'Invalid email'
        });
    }
    try {
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({
                statusCode: 400,
                status: 'FAILURE',
                error: 'Email already exists'
            });
        }
        bcrypt.hash(password, 12).then(hashedPassword => {
            const user = new User({
                username,
                password: hashedPassword,
                email
            });
            user.save();
        }).then(() => {
            return res.status(201).json({
                statusCode: 201,
                status: 'SUCCESS',
                message: "Please login to continue"
            })
        })
    } catch (err) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }
        next(err);
    }
})

//API TO LOGIN USER
router.post('/login', async (req, res) => {
    try {
        const username = req.body.username;
        const userpassword = req.body.password;
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                status: 'FAILURE',
                message: 'No user found'
            })
        }

        const hashedPass = await bcrypt.compare(userpassword, user.password);

        if (!hashedPass) {
            return res.status(401).json({
                statusCode: 401,
                status: "FAILURE",
                message: 'Invalid credential'
            });
        }

        const token = jwt.sign({ userId: user._id, userName: user.username }, "home-care-app", { expiresIn: '30m' }); // Set the expiration time to 1 hour

        res.cookie("AccessToken", token, { httpOnly: true, maxAge: 60000 * 5 }); // Set the expiration time to 1 hour

        const { password, ...userData } = user._doc
        return res.status(200).json({
            statusCode: 200,
            status: "SUCCESS",
            accessToken: token,
            data: userData,
            message: `Welcome ${username}`
        });
    } catch (error) {
        console.log(error)
        return res.status(403).json({
            statusCode: 403,
            status: "FAILURE",
            message: 'Bad request'
        });
    }
})


router.post('/addQuestions', async (req, res) => {
    console.log('h', req.body);
    try {
        const question = new Questionnaire({
            question: req.body.question,
            mentalStates: req.body.mentalStates
        })
        question.save();
        return res.status(201).json({
            status:"SUCCESS"
        })
    } catch (error) {
        return res.status(500).json({
            error: true
        });
    }
})

router.get('/mindMateQuestions',async(req,res)=>{
    try {
        const questions = await Questionnaire.find();
        console.log(questions)
        return res.status(200).json({
            status:"success",
            data:questions,
            count:questions.length
        })
    } catch (error) {
        return res.status(500).json({
            error: true
        });
    }
})


module.exports = router