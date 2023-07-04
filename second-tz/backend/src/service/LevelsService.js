import db from './../config/LevelsDB.js'
import levels from "../models/levelsModels/levelsModel.js";
db.sync()

const LevelsService = {

  async getFirstLevels() {
    const array = await levels.findAll({raw: true})
    const resArr = array.map((element) => ({
      value: element.id,
      label: element.level_1,
      ifLeaf: element.level_2 != null
    }))
    return resArr
  },
  async getNextLevel(data) {
    const result = await levels.findOne({where: {id: data.id}, raw: true})
    let level = data.level
    let keys = Object.keys(result)
    let nextIndex = Object.keys(result).indexOf(level) + 1
    let element = {
        value: result.id,
        label: result[level],
        ifLeaf: !!result[keys[nextIndex]] && keys[nextIndex] !== "createdAt" && keys[ nextIndex] !== "updatedAt"
    }
      return element
    }
}
export default LevelsService
