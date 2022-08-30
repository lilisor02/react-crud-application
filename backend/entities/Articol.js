import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Articol = db.define("Articol", {
    ArticolId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ArticolTitlu: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [5, 100],
                msg: "Titlu articol trb sa aiba intre 5 si 100 caractere!"
            }
        },
        allowNull: false
    },
    ArticolAbstract: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [10, 200],
                msg: "Abstract articol trb sa aiba intre 10 si 200 caractere!"
            }
        },
        allowNull: false
    },
    ArticolData: {
        type: Sequelize.DATEONLY,
        validate: {
            isDate: {
                msg: "Data articol nu respecta formatul YYYY-MM-DD!"
            }
        },
        allowNull: false
    }
})

export default Articol;