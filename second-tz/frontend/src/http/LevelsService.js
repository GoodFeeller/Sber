import axios from 'axios'
const BaseURL = "http://localhost:5000/levels"
const LevelsService = {
    async getFirstLevels() {
        const response = await axios.get(`${BaseURL}/getLevels`)
        return response.data;
    },
    async getNewLevel(data) {
        const response = await axios.post(`${BaseURL}/getNextLevel`, data)
        return response.data
    }
}

export default LevelsService