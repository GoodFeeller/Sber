import express from 'express'
const app = express()
import cors from 'cors'
import GetController from "./src/controllers/dbConstructorControllers/GetController.js";
import PostController from "./src/controllers/dbConstructorControllers/PostController.js";
import LevelsGetController from "./src/controllers/levelsControllers/LevelsGetController.js";
import LevelsPostController from "./src/controllers/levelsControllers/LevelsPostController.js";
const jsonParser = express.json();
app.use(cors())

const dbConstructorRouter = express.Router()
//DBRequestConstructor requests
dbConstructorRouter.get('/getTables', GetController.getTableNames)
dbConstructorRouter.get('/getColumns/:tableName', GetController.getColumns)
dbConstructorRouter.post('/makeResultTable', jsonParser, PostController.makeResultTable)
app.use('/db-constructor', dbConstructorRouter)

const levelsRouter = express.Router()
//Levels requests
levelsRouter.get('/getLevels', LevelsGetController.getFirstLevels)
levelsRouter.post('/getNextLevel', jsonParser, LevelsPostController.getNextLevel)
app.use('/levels', levelsRouter)
app.listen(5000, (err) => {
  if(err) console.log(err)
  else console.log('Server running!')
})
