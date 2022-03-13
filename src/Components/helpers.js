import React, { Component, useEffect, useState } from "react";


const IsMobile = function (callback = () => { }) {
    let IsMobile = (document.body.clientWidth <= 768);
    let navigator = /Mobi/i.test(window.navigator.userAgent);
    addEventListener('resize', function (data) {
        let isNowMobile = (document.body.clientWidth <= 768);
        callback(isNowMobile);
    });
    return IsMobile;
};

const ComponetMaker = function (Template, stack, connection = function () { }, mark = false) {
    let newStack = stack.map((data, index) => (< Template key={"map-creator-" + index} {...data}
        connect={connection}
        index={index}
        mark={mark}
    />));
    return (newStack);
}

const isElementInViewport = function ({ current }) {
    var rect = current.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}


function onVisibilityChange(el, callback) {
    var old_visible;
    return function () {
        var visible = isElementInViewport(el);
        if (visible != old_visible) {
            old_visible = visible;
            if (typeof callback == 'function' && visible) {
                callback(visible);
            }
        }
    }
}

function OnView(ref, callback) {
    var handler = onVisibilityChange(ref, callback);
    addEventListener('DOMContentLoaded', handler, false);
    addEventListener('load', handler, false);
    addEventListener('scroll', handler, false);
    addEventListener('resize', handler, false);

}


function GetData(url, type = "api", timeOut = 10000, cache = "no-cache") {
    let FromApi = (data) => (data.response.status === 200) ? data.data : false;
    let local = (data) => (data.nodes);
    let callback = (type == "local") ? local : FromApi;
    let Save = new Promise((resolve, reject) => {
        let timer = setTimeout(() => reject(new Error('Request timed out')), timeOut);
        fetch(url, { cache: cache })
            .then((response) => response.json())
            .catch(error => reject(error))
            .then(callback)
            .then(function (data) {
                resolve(data);
                return data;
            })
            .then((response) => { });

    });

    return Save;
}

function GetTime(created, hours = true) {
    let date = new Date(created * 1000)
    let dateaux = new Date();
    let mesAct = dateaux.getMonth() + 1
    let dateAct = dateaux.getDate() + '-' + mesAct + '-' + dateaux.getFullYear()
    let mesNota = date.getMonth() + 1;
    let fechaNota = date.getDate() + '-' + mesNota + '-' + date.getFullYear();
    let formated = '';

    if (fechaNota === dateAct) {
        //if(hours == true){
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        //formated = date.getHours()+':'+minutes+' hrs.'
        let hour = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
        return hour + ':' + minutes + ' hrs.';
    } else {
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let month = mesNota < 10 ? '0' + mesNota : mesNota;
        //formated = day+ '-'+month+'-'+date.getFullYear();
        return day + '-' + month + '-' + date.getFullYear();
    }
    //return formated
}

function GetDateTime(created, hours = true) {
    let date1 = new Date(created * 1000)
    let dia1 = new Date();
    let dia2 = new Date();
    dia2.setDate(dia2.getDate() - 1);
    let dia3 = new Date();
    dia3.setDate(dia3.getDate() - 2);
    let dia4 = new Date();
    dia4.setDate(dia4.getDate() - 3);
    let dia5 = new Date();
    dia5.setDate(dia5.getDate() - 4);
    let dia6 = new Date();
    dia6.setDate(dia6.getDate() - 5);
    let dia7 = new Date();
    dia7.setDate(dia7.getDate() - 6);



    let mesdia1 = dia1.getMonth() + 1
    let dateAct = dia1.getDate() + '-' + mesdia1 + '-' + dia1.getFullYear();

    let mesdia2 = dia2.getMonth() + 1
    let datedia2 = dia2.getDate() + '-' + mesdia2 + '-' + dia2.getFullYear();

    let mesdia3 = dia3.getMonth() + 1
    let datedia3 = dia3.getDate() + '-' + mesdia3 + '-' + dia3.getFullYear();

    let mesdia4 = dia4.getMonth() + 1
    let datedia4 = dia4.getDate() + '-' + mesdia4 + '-' + dia4.getFullYear();

    let mesdia5 = dia5.getMonth() + 1
    let datedia5 = dia5.getDate() + '-' + mesdia5 + '-' + dia5.getFullYear();

    let mesdia6 = dia6.getMonth() + 1
    let datedia6 = dia6.getDate() + '-' + mesdia6 + '-' + dia6.getFullYear();

    let mesdia7 = dia7.getMonth() + 1
    let datedia7 = dia7.getDate() + '-' + mesdia7 + '-' + dia7.getFullYear();


    let mesNota = date1.getMonth() + 1;
    let fechaNota = date1.getDate() + '-' + mesNota + '-' + date1.getFullYear();
    let formated = '';


    if (fechaNota === dateAct) {
        return 'Guardado hoy';
    } else if (fechaNota === datedia2) {

        return 'Guardado hace 1 día';
    } else if (fechaNota === datedia3) {
        return 'Guardado hace 2 días';
    } else if (fechaNota === datedia4) {
        return 'Guardado hace 3 días';
    } else if (fechaNota === datedia5) {
        return 'Guardado hace 4 días';
    } else if (fechaNota === datedia6) {
        return 'Guardado hace 5 días';
    } else {
        let day = date1.getDate() < 10 ? '0' + date1.getDate() : date1.getDate();
        let month = mesNota < 10 ? '0' + mesNota : mesNota;
        //formated = day+ '-'+month+'-'+date.getFullYear();
        return 'Guardado el ' + day + '-' + month + '-' + date1.getFullYear();
    }
    //return formated
}

function SetCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return false;
}

function GetDate(created, abbreviation = false) {
    let date = new Date(created * 1000);
    let anio = date.getFullYear();
    let month = getNameMonth(date.getMonth(), abbreviation);
    let day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
    return day + ' ' + month + ' ' + anio;
}

function getNameMonth(number = 0, abbreviation = false) {
    const MONTH = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const MONTH_ABBREVIATION = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    if (abbreviation) {
        return MONTH_ABBREVIATION[number];
    } else {
        return MONTH[number];
    }
}

function UrlForChannelUtm() {
    let urlChannel = window.location;
    let Channel = urlChannel.pathname.split("/");
    Channel.shift();
    let joinInfo = Channel.join("_");
    return joinInfo;

}

function UtmPametres({ utm_campaign, utm_medium, utm_source }) {
    if (utm_source === "ChannelPath") {
        utm_source = UrlForChannelUtm();
    }
    let Default = {
        utm_source: utm_source || "urlOrigin",
        utm_medium: utm_medium || "componenteName",
        utm_campaign: utm_campaign || "region",
    }

    const searchParams = new URLSearchParams(Default);
    let BuildParametres = searchParams.toString();
    return BuildParametres;
}

function GetUrl(newUrl, utm = false) {
    let url = new URL(newUrl);
    let UrlForUse = url.pathname;
    if (utm) {
        let UtmConfig = UtmPametres(utm);
        UrlForUse = (UtmConfig) ? UrlForUse + "?" + UtmConfig : UrlForUse;
    }
    return UrlForUse;
}

function replaceAccent(string) {

    let name = string.replace('á', 'a');
    name = name.replace('é', 'e');
    name = name.replace('í', 'i');
    name = name.replace('ó', 'o');
    name = name.replace('ú', 'u');
    return name.toLowerCase();
}

function replaceUrlImage(style = '', replace = '', image) {
    return image.replace(style, replace);
}

function getRange(current, Yesterday) {

    current = new Date(current * 1000);
    let mes_current = current.getUTCMonth();
    let dia_current = current.getUTCDate() + 1;
    let year_current = current.getUTCFullYear();
    let current_aux = new Date(year_current, mes_current, dia_current) / 1000;
    Yesterday = new Date(Yesterday * 1000);
    let mes_y = Yesterday.getUTCMonth();
    let dia_y = Yesterday.getUTCDate();
    let year_y = Yesterday.getUTCFullYear();
    let Yesterday_aux = new Date(year_y, mes_y, dia_y) / 1000;
    return [current_aux, Yesterday_aux];
}

export {
    ComponetMaker,
    OnView,
    IsMobile,
    GetData,
    GetTime,
    GetDate,
    SetCookie,
    getCookie,
    GetUrl,
    replaceAccent,
    replaceUrlImage,
    getRange,
    GetDateTime
};
