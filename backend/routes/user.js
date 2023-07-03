const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Questionnaire = require('../Models/Question');
const Result = require('../Models/Result');
const Appointment = require('../Models/Appointments');
const StateResources = require('../Models/Resources');


// const verifyToken = async (req, res, next) => {
//     if (!req.headers.authorization) {
//         res.status(403).json({
//             status: "Failed",
//             code: 403,
//             message: "Token not found.",
//         });
//     }
//         let token = req.headers.authorization.split(" ")[1];
//         console.log(token)
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

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: "FAILURE",
            error: 'Token not found!'
        });
    }

    try {
        const decoded = jwt.verify(token, 'home-care-app');

        console.log('Token is valid', decoded.userId);
        const user = await User.findOne({ _id: decoded.userId })
        console.log(user)

        if (decoded.userName !== user?.username) {
            return res.status(401).json({
                status: false,
                message: "Not Authorized",
            });
        }
        req.userId = decoded?.userId
        req.accessToken = token
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                statusCode: 401,
                status: "FAILURE",
                message: 'Token has expired !'
            });
        } else {
            console.error('Token verification failed', error);
            return res.status(401).json({
                statusCode: 401,
                status: "FAILURE",
                message: 'Authentication failed'
            });
        }
    }
}

router.get('/get', (req, res) => {
    res.send('hello world')
})


router.post('/signup', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    console.log("signup", req.body)
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
    console.log("login", req.body)
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

//verifyAdmin
const verifyAdminToken = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(403).json({
            status: "failed",
            code: 403,
            message: "Token not found Authentication failed",
        });
    }
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(403).json({
            status: false,
            message: "Token not found",
        });
    }
    jwt.verify(token, "home-care-app", async (err, decoded) => {
        // const { password, __v, ...adminInfo } = adminData._doc
        if (decoded?.username === "admin") {
            req.admin = decoded.username;
            req.accessToken = token;
            next();
        } else {
            return res.status(403).json({
                code: 403,
                status: "FAILURE",
                message: "Authentication token expired!!! Please Login to continue.",
            });
        }

        if (err) {
            res.status(400).json({
                status: false,
                message: "Authentication failed",
                error: err,
            });
        }
    });
};


router.post("/Adminlogin", async (req, res) => {
    const { username, password } = req.body;

    try {
        if (username === "admin" && password === "admin") {
            const token = jwt.sign({ username }, "home-care-app", {
                expiresIn: "1h",
            }); // Set the expiration time to 1 hour

            res.cookie("AccessToken", token, { httpOnly: true, maxAge: 3600000 }); // Set the expiration time to 1 hour

            return res.status(200).json({
                statusCode: 200,
                status: "SUCCESS",
                accessToken: token,
                message: `Login successful. Welcome ${username?.toUpperCase()} to HOME CARE APPLIANCES`,
            });
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(404).json({
            statusCode: 404,
            status: "FAILURE",
            error: true,
            message: "The requested resource could not be found.",
        });
    }
});


//verifyAdmin
router.get("/validateAdmin", verifyAdminToken, (req, res) => {
    console.log(req.admin);
    if (req.admin !== "admin") {
        return res.status(401).json({
            statusCode: 404,
            status: "FAILURE",
            error: true,
            message: "Unauthorized.",
        });
    }
    res.cookie("AccessToken", req.accessToken, {
        httpOnly: true,
        maxAge: 3600000,
    });
    return res.status(200).json({
        statusCode: 200,
        adminId: req.admin,
        status: "SUCCESS",
        accessToken: req.accessToken,
        message: `Login successful. Welcome ${req.admin?.toUpperCase()} to HOME CARE APPLIANCES`,
    });
});


//get user details
router.get('/getUserDetails', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId });
        const { password, ...userInfo } = user._doc
        return res.status(200).json({
            statusCode: 200,
            status: "SUCCESS",
            accessToken: req.accessToken,
            data: userInfo,
        });
    } catch (error) {
        return res.status(401).json({
            statusCode: 401,
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
            status: "SUCCESS"
        })
    } catch (error) {
        return res.status(500).json({
            error: true
        });
    }
})

router.get('/mindMateQuestions', async (req, res) => {
    try {
        const questions = await Questionnaire.find();
        console.log(questions)
        return res.status(200).json({
            status: "success",
            data: questions,
            count: questions.length
        })
    } catch (error) {
        return res.status(500).json({
            error: true
        });
    }
})

router.post('/saveResult', verifyToken, (req, res) => {
    try {
        if (!req.body.result) {
            return res.status(403).json({
                status: "FAILURE",
                error: "Invalid result!"
            })
        }
        const result = new Result({
            result: req.body.result,
            createdBy: req.userId
        })
        result.save();
        return res.status(200).json({
            status: "SUCCESS",
            accessToken: req.accessToken
        })
    } catch (error) {
        return res.status(500).json({
            error: true
        });
    }
})

router.get('/getPreviousResults', verifyToken, async (req, res) => {
    try {
        const results = await Result.find({ createdBy: req.userId }).sort({ createdAt: 'desc' }).populate('createdBy', 'username email')
        console.log(results)
        return res.status(200).json({
            status: "SUCCESS",
            data: results,
            accessToken: req.accessToken
        })
    } catch (error) {
        return res.status(500).json({
            error: true
        });
    }
})

router.post('/bookAppointment', verifyToken, async (req, res) => {
    const { date, time, hospitalname } = req.body;
    try {
        const existingAppointment = await Appointment.findOne({ date, time });
        if (existingAppointment) {
            return res.status(403).json({
                status: 'FAILURE',
                message: "Appointment already taken by someone!"
            })
        }

        const newAppointment = new Appointment({ username: req.userId, date, time, hospitalname, createdBy: req.userId });

        newAppointment.save()
            .then(savedAppointment => {
                return res.status(200).json({
                    accessToken: req.accessToken,
                    message: 'Appointment booked successfully',
                    appointment: savedAppointment
                });
            })
            .catch(error => {
                return res.status(500).json({
                    error: `Failed to book appointment\n${error}`
                });
            });
    } catch (error) {
        return res.status(500).json({
            status: "FAILURE",
            error: error
        })
    }
})

router.post('/AdminBookAppointment', verifyAdminToken, async (req, res) => {
    const {userId,username ,date, time, hospitalname } = req.body;
    try {
        const existingAppointment = await Appointment.findOne({ date, time });
        if (existingAppointment) {
            return res.status(403).json({
                status: 'FAILURE',
                message: "Appointment already taken by someone!"
            })
        }

        const newAppointment = new Appointment({ username: username, date, time, hospitalname, createdBy: userId });

        newAppointment.save()
            .then(savedAppointment => {
                return res.status(200).json({
                    accessToken: req.accessToken,
                    message: 'Appointment booked successfully',
                    appointment: savedAppointment
                });
            })
            .catch(error => {
                return res.status(500).json({
                    error: `Failed to book appointment\n${error}`
                });
            });
    } catch (error) {
        return res.status(500).json({
            status: "FAILURE",
            error: error
        })
    }
})


//get all apointment
router.get('/appointments/upcoming', verifyAdminToken, async (req, res) => {
    const currentDate = new Date();
    // Find all appointments where the date is greater than or equal to the current date
    await Appointment.find({ date: { $gte: currentDate } }).sort({ createdAt: 'desc' }).populate('createdBy', 'username email')
        .then(appointments => {
            res.status(200).json({
                status: "SUCCESS",
                appointments,
                accessToken: req.accessToken
            });
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to fetch upcoming appointments' });
        });
});

//api to get user appointments
router.get('/upcomingAppointments', verifyToken, async (req, res) => {
    const currentDate = new Date();
    // Find all appointments where the date is greater than or equal to the current date
    await Appointment.find({ date: { $gte: currentDate }, createdBy: req.userId }).sort({ createdAt: 'desc' })
        .then(appointments => {
            res.status(200).json({
                status: "SUCCESS",
                appointments,
                accessToken: req.accessToken
            });
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to fetch upcoming appointments' });
        });
});


//api to get all users
router.get('/getAllUsers', verifyAdminToken, async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            status: "SUCCESS",
            data: users,
            accessToken: req.accessToken
        })
    } catch (error) {
        return res.status(500).json({
            status: "FAILURE",
            error: error
        })
    }
})


//create resources
router.post('/addResources', verifyAdminToken, async (req, res) => {
    const { resourceTitle, symptoms, seeDoctor, treatMent } = req.body;
    try {
        const resource = await StateResources.findOne({ resourceTitle });
        if (resource) {
            return res.status(500).json({
                status: "already exists",
                error: error
            })
        }

        if (resourceTitle === "" || !resourceTitle) {
            return res.status(500).json({
                status: "already exists",
                error: error
            })
        }

        const resources = await new StateResources({
            resourceTitle, symptoms, seeDoctor, treatMent
        })

        resources.save();

        return res.status(200).json({
            status: "SUCCESS",
            message: "Resources saved",
            accessToken: req.accessToken
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "FAILURE",
            error: error
        })
    }
})

//get all resources
router.get('/getResources', verifyToken, async (req, res) => {
    try {
        const resources = await StateResources.find();
        return res.status(200).json({
            status: "SUCCESS",
            data: resources,
            accessToken: req.accessToken
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "FAILURE",
            error: error
        })
    }
});

//edit Resources
router.put('/editResources/:id', verifyAdminToken, async (req, res) => {
    const { id } = req.params
    // const {resourceTitle,symptoms,seeDoctor,treatMent} = 
    const updatedData = req.body
    try {
        const resource = await StateResources.findOne({ _id: id });
        console.log(resource);

        if (!resource) {
            return res.status(500).json({
                status: "FAILURE",
            })
        }

        resource.resourceTitle = updatedData?.resourceTitle;
        resource.seeDoctor = updatedData?.seeDoctor
        resource.treatMent = updatedData?.treatMent
        resource.symptoms = updatedData?.symptoms

        const updatedResource = await resource.save();
        return res.status(200).json({
            status: "SUCCESS",
            data: updatedResource,
            accessToken: req.accessToken
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "FAILURE",
            error: error
        })
    }
})
module.exports = router