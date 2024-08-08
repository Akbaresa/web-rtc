import { apiHeaderService } from "./apiService";

export const joinUserRoom = async (data) => {
    try{
        const result = await apiHeaderService.post("room/join", data);
        return result.data;
    }catch(e){
        throw e;
    }
}

export const getAllUserRoom = async (data) => {
    try{
        const result = await apiHeaderService.post("all-user-room", data);
        return result.data;
    }catch(e){
        throw e;
    }
}