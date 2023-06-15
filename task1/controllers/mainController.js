const table_1_model = require("../models/model")
const table_2_model = require("../models/tb2_model")
const temporal = require("../models/Temporal")



exports.addNewLevel = (req, res) => {
    table_1_model.findOne({where: {id: req.body.id}}).then((data) => {
        let key = req.body.level;
        let keys = Object.keys(data.dataValues)
        let index = keys.indexOf(key);
        let element = {
            value: data.id,
            label: data[keys[index + 1]],
            ifLeaf: !!data[keys[index + 2]] && keys[index + 2]!== "createdAt" && keys[index + 2] !== "updatedAt"
        }
        res.json(element)
    })
}
exports.deleteTable2Element =  (req, res) => {
    table_2_model.destroy({where: {id: req.body.id}}).then(() => {
        res.sendStatus(200);
    }).catch(() => {
        res.sendStatus(400);
    })
}
exports.addTable2Element = (req, res) => {
    table_2_model.create({info: req.body.info}).then((data) => {
        res.json(data)
    })
}
exports.changeTable2Element = (req, res) => {

    table_2_model.update({info: req.body.info}, {where: {id: req.body.id}}).then(() => {
        res.sendStatus(200)
    }).catch(() => {
        res.sendStatus(400)
    })
}
exports.getInfo = (_, response) => {
    let array;
    table_1_model.findAll({raw: true}).then( (data) => {
        array = data.map((element) => {
            const obj = {
                value: element.id,
                label: element.level_1,
                ifLeaf: element.level_2 != null
            }
            return obj;
        })
    }).catch(() => response.send("DB Error"))
    table_2_model.findAll({raw: true}).then((data) => {
        response.render("content.hbs", {
            item: array,
            tb2: data
        })
    })
}