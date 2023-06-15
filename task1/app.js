const express = require("express")
const PORT = 8080;
const app = express();
const jsonParser = express.json();
const mainController = require('./controllers/mainController')
app.set("view engine", "hbs")
app.use(express.static(__dirname + '/public'))

app.post('/add', jsonParser,mainController.addNewLevel)
app.post("/delete_tb2",jsonParser,mainController.deleteTable2Element)

app.post("/add_tb2", jsonParser, mainController.addTable2Element)
app.post('/change_tb2', jsonParser, mainController.changeTable2Element)
app.get("/", mainController.getInfo)

app.listen(PORT)