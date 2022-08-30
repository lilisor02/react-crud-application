import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Referinta = db.define("Referinta", {
    ReferintaId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ReferintaTitlu: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [5, 100],
                msg: "Titlu referinta trb sa aiba intre 5 si 100 caractere!"
            }
        },
        allowNull: false
    },
    ReferintaData: {
        type: Sequelize.DATEONLY,
        validate: {
            isDate: {
                msg: "Data referinta nu respecta formatul YYYY-MM-DD!"
            }
        },
        allowNull: false
    },
    ReferintaListaAutori: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ArticolId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default Referinta;