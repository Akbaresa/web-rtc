import { apiService } from "./apiService";

export const register = async (data) => {
    try {
        const response = await apiService.post('users', data);
        return response.data;
    }catch(e){
        throw e;
    }
}

export const login = async (data) => {
    try {
        const response = await apiService.post('users/login', data);
        return response.data;
    }catch(e){
        throw e;
    }
}