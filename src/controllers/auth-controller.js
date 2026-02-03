import { addUser, getUserByUsername } from '../db/queries.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    const { username, fullname, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Enter all required details!'
        })
    }

    try {

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
            message: 'Internal Server Error: User Registration'
        });
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Enter all required details!'
        })
    }

    try {
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
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d'
        })

        return res.status(200).json({
                success: true,
                message: `${user.username}, you are successfully logged in!`,
                accessToken
            });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error: User Login'
        });
    }
}

export { registerUser, loginUser }