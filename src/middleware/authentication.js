import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No access token provided!'
            })
        }

        const decodedToken = jwt.decode(token, process.env.JWT_SECRET_KEY);
        req.userInfo = decodedToken;
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error : auth middleware',
            error
        })
    }

}

export {authMiddleware}