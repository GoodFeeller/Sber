import db from '../../../config/Database.js'
import Sequelize from 'sequelize'

const OtherRisk = db.define('otherRiskConn_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        info: {
            type: Sequelize.STRING,
            comment: 'Связть с другими видами риска',
        },

    }, {
        freezeTableName: true
    }
);
export default OtherRisk
