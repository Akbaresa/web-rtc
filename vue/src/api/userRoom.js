import { apiHeaderService } from "./apiService";

export const joinUserRoom = async (data) => {
    try{
        const result = await apiHeaderService.post("room/join", data);
        return result.data;
    }catch(e){
        throw e;
    }
}