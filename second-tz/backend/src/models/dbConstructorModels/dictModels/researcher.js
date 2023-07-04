import db from '../../../config/Database.js'
import Sequelize from 'sequelize'

const Researcher = db.define('researcher_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        info: {
            type: Sequelize.STRING,
            comment: 'Исследователь',
        },
        // comment: 'Исследователь',
    }, {
        freezeTableName: true
    }
);

export default Researcher
