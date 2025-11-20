import axios from "axios";

const authInstance = axios.create({
    baseURL: "http://localhost:5000/auth",
    headers: {
        'Content-Type': 'application/json'
    }
});

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: any;
    token: string;
    refreshToken: string;
}

class AuthClient {

    login = (data: LoginData) => {
        return authInstance
            .post<AuthResponse>('/login', data)
            .then(res => res.data);
    };

    register = (data: LoginData) => {
        return authInstance
            .post<AuthResponse>('register', data)
            .then(res => res.data);
    };
}

export default AuthClient;
