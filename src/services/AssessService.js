import axios from "axios";
import { InfoUrl } from "../until/InfoUrl";
const AssessService = {
    submitForm: async (data) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.post(`${InfoUrl}/api/assess/save-assess`, {
                userId: data.userId,
                toUserId: data.toUserId,
                totalPoint: data.totalPoint,
                assessDetails: data.assessDetails
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching saveData:", error);
        }
    },
    fetchListData: async() => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.get(`${InfoUrl}/api/criterias`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            localStorage.setItem("listData", JSON.stringify(response.data.data));
            return response.data.data;
        } catch (error) {
            console.error("Error fetching listData:", error);
        }
    }
}

export default AssessService;