import db from '../../config/Database.js'
import Sequelize from 'sequelize'

const Reason = db.define('reason', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        description: {
            type: Sequelize.STRING,
            defaultValue: null,
            comment: 'Описание причины'
        }
    }, {
        freezeTableName: true
    }
);
export default Reason
