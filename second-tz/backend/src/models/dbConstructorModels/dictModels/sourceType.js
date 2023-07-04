import db from '../../../config/Database.js'
import Sequelize from 'sequelize'

const SourceType = db.define('sourceType_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        L1: {
            type: Sequelize.STRING,
            comment: 'Источник риска (тип события)',

        },
        L2: {
            type: Sequelize.STRING,
        },

    }, {
        freezeTableName: true
    }
);

export default SourceType
