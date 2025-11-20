import * as authModel from "../Models/authModel.js"; 

export const register = async(req, res) => {
    const {email, password} = req.body
    try {
        const {data, error} = await authModel.registerUser(email, password)
        
        if (error) {
            return res.status(400).json({error: error.message})
        }
        
        res.status(201).json({user: data.user})
    } catch (e) {
        res.status(500).json({error: "Server error"});
    }
}



export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const {data, error} = await authModel.loginUser(email, password)
        if(error) return res.status(400).json({error: error.message})

        res.status(200).json({user: data.user,
            token: data.session?.access_token, 
            refreshToken: data.session.refresh_token})
    } catch (e) {
        res.status(500).json({error: "server error"})
    }
}
