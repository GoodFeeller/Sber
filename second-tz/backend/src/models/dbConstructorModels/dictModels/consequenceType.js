import db from '../../../config/Database.js'
import Sequelize from 'sequelize'

const ConsequenceType = db.define('consequenceType_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        L1: {
            type: Sequelize.STRING,
            comment: 'Тип последствия'
        },
        L2: {
            type: Sequelize.STRING,
        },
        L3: {
            type: Sequelize.STRING,
        },
        L4: {
            type: Sequelize.STRING,
        },
        // comment: 'Тип последствия',
    }, {
        freezeTableName: true
    }
);
export default ConsequenceType
