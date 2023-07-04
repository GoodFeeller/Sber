import LevelsService from "../../service/LevelsService.js";

const LevelsGetController = {
  async getFirstLevels(req, res) {
    const resData = await LevelsService.getFirstLevels();
    res.json(resData)
  }
}
export default LevelsGetController
