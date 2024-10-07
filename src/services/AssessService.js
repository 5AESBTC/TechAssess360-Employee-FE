import axios from "axios";
import { InfoUrl } from "../until/InfoUrl";
const AssessService = {
    // isSubmitForm: async (userId, toUserId) => {
    //     try {
    //         const accessToken = localStorage.getItem("accessToken");
    //         const response = await axios.get(`${InfoUrl}/api/assess/is-submit-form`, {
    //             params: {
    //                 userId: userId,
    //                 toUserId: toUserId
    //             },
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //             },
    //         });
    //         return response.data;
    //     } catch (error) {
    //         console.error("Error fetching isSubmitForm:", error);
    //     }
    // },
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
            if (response.data.success) {
                console.log("Lưu dữ liệu thành công!", response.data.data);
                return response.data; // Trả về dữ liệu nếu cần
            } else {
                console.error("Lưu dữ liệu không thành công:", response.data.message);
            }
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
            return response.data.data;
        } catch (error) {
            console.error("Error fetching listData:", error);
        }
    }
}

export default AssessService;