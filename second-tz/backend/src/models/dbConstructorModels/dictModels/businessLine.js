import db from '../../../config/Database.js'
import Sequelize from 'sequelize'
const BusinessLine = db.define('businessLine_dict', {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        L1: {
            type: Sequelize.STRING,
        },
        L2: {
            type: Sequelize.STRING,
            comment: 'Бизнес линия'
        },
        // comment: 'Бизнес линия',
    }, {
        freezeTableName: true
    }
);
export default BusinessLine;
