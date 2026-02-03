import { addUser, getUserByUsername } from '../db/queries.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {

    try {
        const { username, fullname, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Enter all required details!'
            })
        }

        // hash the password before storing in DB
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // get time of creation of user
        const createdAt = (new Date()).toISOString()

        const newUser = addUser.get(
            username,
            fullname,
            email,
            hashedPassword,
            createdAt
        )

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            newUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error: User Registration',
            error
        });
    }
}

const loginUser = async (req, res) => {

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Enter all required details!'
            })
        }
        const user = getUserByUsername.get(username);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            });
        }

        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Password!'
            });
        }

        const accessToken = jwt.sign({
            username: user.username,
            userId: user.userId
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '10m'
        })

        const refreshToken = jwt.sign({
            userId: user.userId
        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '7d'
        })

        req.cookie('jwt', refreshToken)

        return res.status(200).json({
            success: true,
            message: `${user.username}, you are successfully logged in!`,
            accessToken
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error: User Login',
            error
        });
    }
}

const renewAccesToken = async (req, res) => {
    try {
        if (req.cookies?.jwt) {
            const refreshToken = req.cookie.jwt;

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
                (err, decoded) => {
                    if (err) {
                        return res.status(406).json({
                            success: false,
                            message: 'Unauthorized'
                        })
                    } else {
                        const accessToken = jwt.sign({
                            username: req.userInfo.username,
                            userId: req.userInfo.userId
                        })

                        return res.status(200).json({
                            success: true,
                            message: 'Access Token renewed!',
                            accessToken
                        })
                    }
                }
            )
        } else {
            return res.status(401).json({
                success: false,
                message: 'No Refresh Token!'
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error : Access Token renew failed!'
        })
    }
}

// const logoutUser = async (req, res) => {
//     try {
//         if (!req.userInfo) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Unable to logout, not logged in'
//             })
//         }

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: 'Internal server error : Logout User',
//             error
//         })
//     }
// }

export { registerUser, loginUser, renewAccesToken }