const link = "http://localhost:8000/api";

const routeGetArticoleFull = link + '/getArticoleFull';
const routeGetArticole = link + '/getArticole';
const routeGetArticolById = link + '/getArticolById'; //   /:idArticol
const routeGetReferinte = link + '/getReferinte';
const routeGetReferinteByArticol = link + '/getReferinteByArticol'; //    /:idArticol
const routeGetReferintaByArticol = link + '/getReferintaByArticol'; //    /:idArticol/:idReferinta
const routeGetArticoleFilter = link + '/getArticoleFilter'; //    ?titlu=ceva&abstract=altceva
const routeGetArticoleSortate = link + '/getArticoleSortateDupaData';
const routeExportArticoleFull = link + '/exportArticoleFull';

const routePostArticol = link + '/addArticol';
const routePostReferinta = link + '/addReferinta'; //   /:idArticol

const routeDeleteArticol = link + '/deleteArticol';  //    /:idArticol
const routeDeleteReferinta = link + '/deleteReferinta'; //    /:idArticol/:idReferinta

const routePutArticol = link + '/updateArticol'; //   /:idArticol
const routePutReferinta = link + '/updateReferinta'; //  /:idArticol/:idReferinta


export {
    routeGetArticoleFull, routeGetArticole, routeGetArticolById, routeGetReferinte, routeGetReferinteByArticol,
    routeGetReferintaByArticol, routeGetArticoleFilter, routeGetArticoleSortate, routeExportArticoleFull,
    routePostArticol, routePostReferinta,
    routeDeleteArticol, routeDeleteReferinta,
    routePutArticol, routePutReferinta
}