import db from '../../config/Database.js'
import Sequelize from 'sequelize'

const Effort = db.define('effort', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        effortRealisationDate: {
            type: Sequelize.DATEONLY,
            comment: 'Срок реализации меры',
            validate:{
                isDate:true
            }
        },
        effortDescription: {
            type: Sequelize.STRING,
            comment: 'Описание меры',
            default: null
        } ,
    }, {
        freezeTableName: true
    }
);
export default Effort
