function putPageIdInSession(pageId) {
    sessionStorage.setItem("pageId", pageId);
}

function getPageIdInSession() {
    var pId = sessionStorage.getItem("pageId");
    return pId;
}

function putJSonInSession(nameInStorage, url) {
    //var networkState = checkConnection();
    //if (networkState != 'Unknown connection' && networkState != 'No network connection') {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", url, true);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && (ajax.status == 200)) {
                eval('var data = ' + ajax.responseText + ';');
                sessionStorage.setItem(nameInStorage, JSON.stringify(data));
            }
        }
        ajax.send();
    //} else {
    //    sessionStorage.setItem("no-connection", "true");
    //    sessionStorage.setItem(nameInStorage, JSON.stringify(new Array()));
    //}
};

function checkConnection() {
    var networkState = navigator.network.connection.type;
    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.NONE] = 'No network connection';
    return states[networkState];
};

function putVarInSession(nameInStorage, i) {
    sessionStorage.setItem(nameInStorage, i);
};

function getJSonFromSession(nameInStorage) {
    var tmp = JSON.parse(sessionStorage.getItem(nameInStorage));
    return tmp;
};

function getJSonArraySelectedFromSession(nameInStorage, i) {
    var tmp = JSON.parse(sessionStorage.getItem(nameInStorage));
    return tmp[i];
};

function getVarSelectedFromSession(nameInStorage) {
    var tmp = sessionStorage.getItem(nameInStorage);
    return tmp;
};

function Concerto() {
    var nome;
    var via;
    var numeroCivico;
    var cap;
    var citta;
    var provincia;
    var regione;
    var stato;
    var numeroTelefono;
    var nomeGruppo;
    var descrizioneConcerto;
    var giorno;
    var mese;
    var anno;
    var ora;
    var minuti;
};

function getMonthName(month) {
    var monthString;
    var monthNumber = parseInt(month, 10);
    switch (monthNumber) {
    case 1:
        monthString = "gen";
        break;
    case 2:
        monthString = "feb";
        break;
    case 3:
        monthString = "mar";
        break;
    case 4:
        monthString = "apr";
        break;
    case 5:
        monthString = "mag";
        break;
    case 6:
        monthString = "giu";
        break;
    case 7:
        monthString = "lug";
        break;
    case 8:
        monthString = "ago";
        break;
    case 9:
        monthString = "set";
        break;
    case 10:
        monthString = "ott";
        break;
    case 11:
        monthString = "nov";
        break;
    case 12:
        monthString = "dic";
        break;
    }
    return monthString;
}

function getFirstConcert() {
    var tmp = getJSonFromSession("concerti");
    var result;
    var noConcerto;
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    if (tmp && tmp.length > 0) {
        var i = 0;
        var curr = tmp[i];
        var currDate = new Date(curr.anno, curr.mese - 1, curr.giorno);
        while (currDate < date) {
            i++;
            if (i == tmp.length) break;
            curr = tmp[i];
            currDate = new Date(curr.anno, curr.mese - 1, curr.giorno);
        }
        if (i < tmp.length) {
            result = curr;
        } else {
            result = null;
        }
        if (result != null) {
            var exitDate = new Date(result.anno, result.mese - 1, result.giorno);
            if (exitDate < date) {
                noConcerto = 1;
            } else {
                noConcerto = 0;
            }
        } else {
            noConcerto = 1;
        }
    } else {
        noConcerto = 1;
    }
    if (noConcerto == 1) {
        result = buildNoConcertoMock();
    } else {
        result.posizione = i;
    }
    putVarInSession('prossimaData', JSON.stringify(result));
    return result;
}

function listConcerti() {
    var firstConcert = getFirstConcert();
    var concerti = getConcertiFromSession();
    var i = firstConcert.posizione;
    var output = new Array();
    if (i != 'mock') {
        var j = 0;
        for (; i < concerti.length; i++) {
            output[j++] = concerti[i];
        }
    }
    return output;
};

function buildNoConcertoMock() {
    var tmp = new Concerto();
    tmp.nome = 'Nessuna data prevista';
    tmp.posizione = 'mock';
    tmp.anno = '--';
    tmp.mese = '--';
    tmp.giorno = '--';
    return tmp;
};

function putConcertiInSession(url) {
    putJSonInSession('concerti', url);
};

function putIndiceConcertiInSession(i) {
    putVarInSession('indiceConcerti', i);
};

function getConcertiFromSession() {
    return getJSonFromSession('concerti');
};

function getConcertoSelectedFromSession(i) {
    return getJSonArraySelectedFromSession('concerti', i);
};

function getIndiceConcertiSelectedFromSession() {
    return getVarSelectedFromSession('indiceConcerti');
};

function putNewsInSession(url) {
    putJSonInSession('news', url);
};

function getNewsFromSession() {
    return getJSonFromSession('news');
};

function putImmaginiInSession(url) {
    putJSonInSession('immagini', url);
};

function getImmaginiFromSession() {
    return getJSonFromSession('immagini');
};