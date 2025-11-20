import { useMutation } from "@tanstack/react-query";
import AuthClient, { AuthResponse } from "../../services/authClient";
import { LoginData } from "../Entities/Auth";


const authClient = new AuthClient()
const useLogin = () => {
    return useMutation<AuthResponse, Error, LoginData>({
        mutationFn: authClient.login,
        onSuccess: (data) => {
                localStorage.setItem('access_token', data.token);
                localStorage.setItem('refresh_token', data.refreshToken);
        }
    })
}

const useRegister = () => {
    return useMutation<AuthResponse, Error, LoginData>({
        mutationFn: authClient.register,
        onSuccess: (data) => {
            if(data.token) {
                localStorage.setItem('access_token', data.token);
                localStorage.setItem('refresh_token', data.refreshToken);
            }
        },
    })
}

export {useLogin, useRegister} 