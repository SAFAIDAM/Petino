import * as jose from 'jose';
import { TextEncoder } from 'util';


const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.tokenjose; 

        if (!token) {
            return next("Authentication failed: Token not provided");
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload: decodedToken } = await jose.jwtVerify(token, secret);

        const userId = decodedToken.id;

        req.body.user = {
            userId: userId
        };

        next();
    } catch (error) {
        console.log("Error in authentication:", error.message);
        return next("Authentication failed: Invalid token");
    }
};

export default userAuth;
