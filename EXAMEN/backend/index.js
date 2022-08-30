import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import mysql from 'mysql2/promise';
import { DB_USERNAME, DB_PASSWORD } from './Const.js';
import db from './dbConfig.js';
import Articol from './entities/Articol.js'
import Referinta from './entities/Referinta.js'
import LikeOperator from './Operators.js'

import fs from 'fs';
'use strict';

let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);


//creare conexiune baza de date
let conn;

mysql.createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD
})
    .then(connection => {
        conn = connection;
        return connection.query("CREATE DATABASE IF NOT EXISTS EnglezaExamen");
    })
    .then(() => {
        return conn.end();
    })
    .catch(err => {
        console.log(err);
    });


//legatura one to many intre cele doua entitati
Articol.hasMany(Referinta, { as: "Referinte", foreignKey: "ArticolId" });
Referinta.belongsTo(Articol, { foreignKey: "ArticolId" });


//GET

//afisare articole impreuna cu referintele aferente
async function getArticoleFull() {
    return await Articol.findAll({ include: ["Referinte"] });
}
router.route('/getArticoleFull').get(async (req, res) => {
    try {
        return res.json(await getArticoleFull());
    }
    catch (err) {
        console.log(err.message);
    }
})

//afisare doar articole, fara referintele lor
async function getArticole() {
    return await Articol.findAll();
}
router.route('/getArticole').get(async (req, res) => {
    try {
        return res.json(await getArticole());
    }
    catch (err) {
        console.log(err.message);
    }
})

//afisare articol cu un anumit id
async function getArticolById(id) {
    return await Articol.findOne(
        {
            where: id ? { ArticolId: id } : undefined
        }
    );
}
router.route('/getArticolById/:id').get(async (req, res) => {
    try {
        return res.json(await getArticolById(req.params.id));
    }
    catch (err) {
        console.log(err.message);
    }
})

//afisare toate referintele
async function getReferinte() {
    return await Referinta.findAll();
}
router.route('/getReferinte').get(async (req, res) => {
    try {
        return res.json(await getReferinte());
    }
    catch (err) {
        console.log(err.message);
    }
})

//afisare referinte ale unui anumit articol
async function getReferinteByArticol(idArticol) {
    if (!(await getArticolById(idArticol))) {
        console.log("Nu s-a gasit articolul!");
        return;
    }
    return await Referinta.findAll({
        include: [{ model: Articol, attributes: ["ArticolTitlu"], where: idArticol ? { ArticolId: idArticol } : undefined }]
    });
}
router.route('/getReferinteByArticol/:idArticol').get(async (req, res) => {
    try {
        return res.json(await getReferinteByArticol(req.params.idArticol));
    }
    catch (err) {
        console.log(err.message);
    }
})

//afisare o anumita referinta dintr-un articol
async function getReferintaByArticol(idArticol, idReferinta) {
    if (!(await getArticolById(idArticol))) {
        console.log("Nu s-a gasit articolul!");
        return;
    }
    return await Referinta.findOne(
        {
            include: [{ model: Articol, attributes: ["ArticolTitlu"], where: idArticol ? { ArticolId: idArticol } : undefined }],
            where: idReferinta ? { ReferintaId: idReferinta } : undefined
        }
    )
}
router.route('/getReferintaByArticol/:idArticol/:idReferinta').get(
    async (req, res) => {
        try {
            return res.json(await getReferintaByArticol(req.params.idArticol, req.params.idReferinta));
        } catch (err) {
            console.log(err.message);
        }
    }
)

//afisare toate articolele filtrate dupa 2 campuri
async function getArticoleFilter(filterQuery) {
    let whereClause = {};

    if (filterQuery.titlu)
        whereClause.ArticolTitlu = { [LikeOperator]: `%${filterQuery.titlu}%` };
    if (filterQuery.abstract)
        whereClause.ArticolAbstract = { [LikeOperator]: `%${filterQuery.abstract}%` };

    return await Articol.findAll({
        where: whereClause
    })
}
router.route('/getArticoleFilter').get(async (req, res) => {
    try {
        return res.json(await getArticoleFilter(req.query));
    }
    catch (err) {
        console.log(err.message);
    }
})

//afisare articole sortate descrescator dupa data
async function getArticoleSortateDupaData() {
    return await Articol.findAll({
        order: [
            ["ArticolData", "DESC"]
        ]
    });
}
router.route('/getArticoleSortateDupaData').get(async (req, res) => {
    try {
        return res.json(await getArticoleSortateDupaData());
    }
    catch (err) {
        console.log(err.message);
    }
})

//export sub forma de json
async function exportArticoleFull() {
    if (!fs.existsSync("./exported"))
        fs.mkdirSync("./exported")
    fs.writeFileSync("./exported/articole_full.json", JSON.stringify(await getArticoleFull()));
}
router.route('/exportArticoleFull').get(async (req, res) => {
    try {
        await exportArticoleFull();
        res.download("./exported/articole_full.json", "downloadArticoleFull.json");
    } catch (err) {
        console.log(err.message);
    }
})



//POST

//adaugare articol
async function createArticol(articol) {
    return await Articol.create(articol);
}
router.route('/addArticol').post(async (req, res) => {
    try {
        return res.status(201).json(await createArticol(req.body));
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error_message: "Internal server error! Could not insert articol!" });
    }
})

//adaugare referinta pentru un anumit articol
async function createReferinta(referinta, idArticol) {
    if (!(await getArticolById(idArticol))) {
        console.log("Nu s-a gasit articolul");
        return;
    }
    referinta.ArticolId = idArticol;
    return await Referinta.create(referinta);
}
router.route('/addReferinta/:idArticol').post(async (req, res) => {
    try {
        return res.status(201).json(await createReferinta(req.body, req.params.idArticol));
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error_message: "Internal server error! Could not insert referinta!" });
    }
})



//PUT

//update articol
async function updateArticol(updatedArticol, idArticol) {
    if (parseInt(idArticol) !== updatedArticol.ArticolId) {
        console.log("ID diferit intre id ruta si id body");
        return;
    }
    let articol = await getArticolById(idArticol);
    if (!articol) {
        console.log("Nu exista articolul cu acest id");
        return;
    }

    return await articol.update(updatedArticol);
}
router.route("/updateArticol/:idArticol").put(async (req, res) => {
    try {
        return res.json(await updateArticol(req.body, req.params.idArticol));
    } catch (err) {
        console.log(err.message);
    }
})

//update referinta a unui articol
async function updateReferinta(updatedReferinta, idArticol, idReferinta) {
    if (parseInt(idReferinta) !== updatedReferinta.ReferintaId) {
        console.log("ID referinta diferit intre id ruta si id body");
        return;
    }

    let articol = await getArticolById(idArticol);
    if (!articol) {
        console.log("Nu exista articolul cu acest id");
        return;
    }

    let referinta = await getReferintaByArticol(idArticol, idReferinta);
    if (!referinta) {
        console.log("Nu exista referinta cu acest id pentru acest articol");
        return;
    }

    return await referinta.update(updatedReferinta);
}
router.route("/updateReferinta/:idArticol/:idReferinta").put(async (req, res) => {
    try {
        return res.json(await updateReferinta(req.body, req.params.idArticol, req.params.idReferinta));
    } catch (err) {
        console.log(err.message);
    }
})


//DELETE

//sterge articol - implicit se sterg si referintele aferente
async function deleteArticol(idArticol) {
    let articolToBeDeleted = await getArticolById(idArticol);

    if (!articolToBeDeleted) {
        console.log("Nu exista articolul cu acest id");
        return;
    }

    return await articolToBeDeleted.destroy();
}
router.route("/deleteArticol/:idArticol").delete(async (req, res) => {
    try {
        return res.json(await deleteArticol(req.params.idArticol));
    } catch (err) {
        console.log(err.message);
    }
})

//stergere referinta a unui anumit articol specific
async function deleteReferinta(idArticol, idReferinta) {

    let articol = await getArticolById(idArticol);
    if (!articol) {
        console.log("Nu exista articolul cu acest id");
        return;
    }

    let referintaToBeDeleted = await getReferintaByArticol(idArticol, idReferinta);

    if (!referintaToBeDeleted) {
        console.log("Nu exista referinta cu acest id la acest articol");
        return;
    }

    return await referintaToBeDeleted.destroy();
}
router.route("/deleteReferinta/:idArticol/:idReferinta").delete(async (req, res) => {
    try {
        return res.json(await deleteReferinta(req.params.idArticol, req.params.idReferinta));
    } catch (err) {
        console.log(err.message);
    }
})



let port = process.env.PORT || 8000;
app.listen(port, async () => {
    await db.sync({ alter: true });
    console.log("Baza de date sincronizata cu succes!");
});
console.log("API is running at " + port);