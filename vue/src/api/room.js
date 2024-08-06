import { apiHeaderService } from "./apiService";

export const createRoomNoPassword = async () => {
    try {
        const response = apiHeaderService.post('room/create-room-allow-all');
        return await response;
    }catch(e){
        throw e;
    }
}