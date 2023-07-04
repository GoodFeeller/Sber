import db from '../../../config/Database.js'
import Sequelize from 'sequelize'

const ReasonType = db.define('reasonType_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        L1: {
            type: Sequelize.STRING,
            comment: 'Классификатор причины',
        },
        L2: {
            type: Sequelize.STRING,
        },
        L3: {
            type: Sequelize.STRING,

        },
        // comment: 'Тип и классификатор причины',
    }, {
        freezeTableName: true
    }
);
export default ReasonType
