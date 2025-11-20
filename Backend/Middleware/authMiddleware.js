import { supabase } from "../Config/supabase";

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({error: 'Access token required'})
    }

    try {
        const {data: {user}, error} = await supabase.auth.getUser(token);
        if(error || !user){
            return res.status(403).json({error: "invalid token"})
        }
        req.user = user
        next()
    }catch(e){
        res.status(403).json({error: 'Token verification failed '})
    }
}