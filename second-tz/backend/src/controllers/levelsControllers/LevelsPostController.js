import LevelsService from "../../service/LevelsService.js";

const LevelsPostController = {
  async getNextLevel(req, res) {
    const data = req.body
    const resData = await LevelsService.getNextLevel(data)
    console.log(resData)
    res.json(resData)
  }
}
export default LevelsPostController
