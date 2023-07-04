import db from '../../../config/Database.js'
import Sequelize from 'sequelize'

const OrgStructure = db.define('orgStructure_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        L1: {
            type: Sequelize.STRING,
            comment: 'Оргструктура(ССП причины)'
        },
        L2: {
            type: Sequelize.STRING,
        },
        L3: {
            type: Sequelize.STRING,
        },
        L4: {
            type: Sequelize.STRING
        },
        // comment: 'Оргструктура(ССП причины)',
    }, {
        freezeTableName: true
    }

);
export default OrgStructure
