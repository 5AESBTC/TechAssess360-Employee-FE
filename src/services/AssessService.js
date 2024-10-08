import axios from "axios";
import { InfoUrl } from "../until/InfoUrl";
const AssessService = {
    fetchMyAssess: async (userId) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.get(`${InfoUrl}/api/assess/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            localStorage.setItem("myAssess", JSON.stringify(response.data.data));
            return response.data;
        } catch (error) {
            console.error("Error fetching myAssess:", error);
        }
    },
    submitForm: async (userId, toUserId, totalPoint, data) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.post(`${InfoUrl}/api/assess/save-assess`, {
                userId: userId,
                toUserId: toUserId,
                totalPoint: totalPoint,
                assessDetails: data.assessDetails
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
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
            return response.data;
        } catch (error) {
            console.error("Error fetching listData:", error);
        }
    },
    fetchAssessSelf: async (userId) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.get(`${InfoUrl}/api/assess/list-assess-of-user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            localStorage.setItem("my-assess", JSON.stringify(response.data.data));
            return response.data;
        } catch (error) {
            console.error("Error fetching assessSelf:", error);
        }
    }
}

export default AssessService;