import db from '../../../config/Database.js'
import Sequelize from 'sequelize'

const FunctionalBlock = db.define('functionalBlock_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        L1: {
            type: Sequelize.STRING,
            comment: 'Функциональный блок'
        },
        L2: {
            type: Sequelize.STRING,
        },
        L3: {
            type: Sequelize.STRING,
        },
        // comment: 'Функциональный блок',
    }, {
        freezeTableName: true
    }
);
export default FunctionalBlock
