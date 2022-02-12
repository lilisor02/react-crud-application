import axios from 'axios'
import {
    routeGetArticoleFull, routeGetArticole, routeGetArticolById, routeGetReferinte, routeGetReferinteByArticol,
    routeGetReferintaByArticol, routeGetArticoleSortate, routeExportArticoleFull,
    routePostArticol, routePostReferinta,
    routeDeleteArticol, routeDeleteReferinta,
    routePutArticol, routePutReferinta
} from './ApiRoutes.js'

async function get(p_url, searchAfter1 = null, searchAfter2 = null) {
    try {
        let newUrl;
        if (searchAfter1) {
            newUrl = p_url + "/" + searchAfter1;
            if (searchAfter2) {
                newUrl = newUrl + "/" + searchAfter2;
            }
        } else {
            newUrl = p_url;
        }

        return (await axios.get(newUrl)).data;

    } catch (err) {
        if (p_url === routeGetArticoleFull)
            alert('Nu s-au putut prelua articolele full.');
        if (p_url === routeGetArticole)
            alert('Nu s-au putut prelua articolele.');
        if (p_url === routeGetReferinte)
            alert('Nu s-au putut prelua referintele.');
        if (p_url === routeGetArticoleSortate)
            alert('Nu s-au putut prelua articolele sortate.');
        if (p_url === routeExportArticoleFull)
            alert('Nu s-au putut exporta articolele.');
        if (p_url === routeGetArticolById)
            alert('Nu s-a putut prelua articolul cu acest id.');
        if (p_url === routeGetReferinteByArticol)
            alert('Nu s-au putut prelua referintele din articolul acesta.');
        if (p_url === routeGetReferintaByArticol)
            alert('Nu s-a putut prelua aceasta referinta din articolul acesta.');
    }
}
// get(routeGetArticoleFull)
// get(routeGetArticole)
// get(routeGetReferinte)
// get(routeGetArticoleSortate)
// get(routeExportArticoleFull)
// get(routeGetArticolById, idArticol)
// get(routeGetReferinteByArticol, idArticol)
// get(routeGetReferintaByArticol, idArticol, idReferinta)

async function getQuery(p_url, p_titlu, p_abstract) {
    try {
        const params = new URLSearchParams({ titlu: p_titlu, abstract: p_abstract });
        let urlFilter = p_url + "?";
        return (await axios.get(`${urlFilter}${params}`)).data;
    } catch (err) {
        alert("Nu s-au putut prelua articolele filtrate dupa titlu si/sau abstract.");
    }
}
// getQuery(routeGetArticoleFilter, titlu, abstract)

async function post(p_url, item, id = null) {
    try {
        let newUrl = id ? p_url + "/" + id : p_url;
        return (await axios.post(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (err) {
        if (p_url === routePostArticol) {
            alert('Eroare la inserare articol!');
        }
        if (p_url === routePostReferinta) {
            alert('Eroare la inserare referinta!');
        }
    }
}
// post(routePostArticol, articol)
// post(routePostReferinta, referinta, idArticol)

async function put(p_url, item, searchAfter1, searchAfter2 = null) {
    try {
        let newUrl;
        newUrl = p_url + "/" + searchAfter1;
        if (searchAfter2) {
            newUrl = newUrl + "/" + searchAfter2;
        }

        return (await axios.put(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (err) {
        if (p_url === routePutArticol) {
            alert('Eroare la modificare articol!');
        }
        if (p_url === routePutReferinta) {
            alert('Eroare la modificare referinta!');
        }
    }
}
// put(routePutArticol, articol, idArticol)
// put(routePutReferinta, referinta, idArticol, idReferinta)

async function remove(p_url, searchAfter1, searchAfter2 = null) {
    try {
        let newUrl;
        newUrl = p_url + "/" + searchAfter1;
        if (searchAfter2) {
            newUrl = newUrl + "/" + searchAfter2;
        }

        return (await axios.delete(newUrl)).data;
    } catch (err) {
        if (p_url === routeDeleteArticol) {
            alert('Eroare la stergere articol!');
        }
        if (p_url === routeDeleteReferinta) {
            alert('Eroare la stergere referinta!');
        }
    }
}
// remove(routeDeleteArticol, idArticol)
// remove(routeDeleteReferinta, idArticol, idReferinta)

export { get, getQuery, post, put, remove }