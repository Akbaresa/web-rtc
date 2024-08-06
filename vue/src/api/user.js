import { apiHeaderService } from "./apiService";

export const getUser = async () => {
    try{
        const response = apiHeaderService.get('/users/current');
        return response;
    }catch(e){
        throw e;
    }
}