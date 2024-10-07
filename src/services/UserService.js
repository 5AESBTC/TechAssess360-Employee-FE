import axios from "axios";
import { InfoUrl } from "../until/InfoUrl";
const UserService = {
    fetchTeamsByUserId: async (userId) => {
        try {
            const response = await axios.get(`${InfoUrl}/api/users/${userId}/same-project`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserService