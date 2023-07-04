import db from '../../../config/Database.js'
import Sequelize from 'sequelize'

const Client = db.define('client_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        info: {
            type: Sequelize.STRING,
            comment: 'Клиент ИОР'

        },
        // comment: 'Клиент ИОР',
    }, {
        freezeTableName: true
    }
);
export default Client
