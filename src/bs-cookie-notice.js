/**
 * A simple cookie consent notice alert for Bootstrap 4 without require jQuery
 * @author Patrick Luan <patrick_luan1@hotmail.com>
 * @licence MIT
 * 
 * @constructor
 * @param {object}
 * @return {object}
 */
var BsCookieNotice = function (options) {
    "use strict";

    var locales = {
        en: {
            message: 'We uses cookies to ensure you get the best experience on our website. By clicking <b>Accept</b>, you agree to the use of cookies.',
            accept: 'Accept',
            more: 'Learn more',
        },
        es: {
            message: 'Usamos cookies para asegurarnos de que obtenga la mejor experiencia en nuestro sitio web. Al hacer clic en <b>Aceptar</b>, acepta el uso de cookies.',
            accept: 'Aceptar',
            more: 'Aprende más',
        },
        pt: {
            message: 'Usamos cookies para garantir que você obtenha a melhor experiência em nosso site. Ao clicar em <b>Aceitar</b>, você concorda com o uso de cookies.',
            accept: 'Aceitar',
            more: 'Saber mais',
        },
    };

    var defaults = {
        locale: 'en',
        customMessage: false,
        accept: {
            html: false,
            classes: [],
            callback: false,
        },
        more: {
            html: false,
            classes: [],
            href: "#",
            callback: false,
        },
        color: "dark",
        expires: 365,
        debug: false
    };

    var params, instance;

    function _init() {
        params = extendDefaults(defaults, options);
        setCustomMessage();

        instance = createNotice(params.color);
        return document.body.appendChild(instance);
    }

    if (!getCookie("acceptCookies")) {
        return _init();
    }

    function setCustomMessage() {
        if (params.customMessage) {
            locales[params.locale] = extendDefaults(locales[params.locale], params.customMessage);
        }
    }

    function createNotice(color) {
       var classes = ["p-2", "fixed-bottom", "fade", "show"];

        if (color === 'light') {
            classes.push("bg-light", "text-dark");
        } else {
            classes.push("bg-dark", "text-white");
        }

        if (document.querySelector('#BsCookieNotice') !== null) {
            document.querySelector('#BsCookieNotice').remove();
        }

        var notice = document.createElement('div');
        var content = createContent();

        notice.setAttribute('id', 'BsCookieNotice');
        notice.appendChild(content);

        for (var i in classes) {
            notice.classList.add(classes[i]);
        }

        return notice;
    }

    function createContent() {
        var content = document.createElement('div');
        var subContent = document.createElement('div');
        var message = createMessage();
        var more = createMore();
        var accept = createAccept();

        message.classList.add("px-1");
        more.classList.add("px-1");
        accept.classList.add("px-1");

        subContent.setAttribute('class', "flex-grow-1");
        subContent.appendChild(message);
        subContent.appendChild(more);

        content.setAttribute('class', 'd-flex');
        content.classList.add("align-items-center");
        content.appendChild(subContent);
        content.appendChild(accept);

        return content;
    }

    function createMessage() {
        var message = document.createElement('span');

        message.innerHTML = locales[params.locale].message;

        return message;
    }

    function createAccept() {
        var accept;

        if (params.accept.html) {
            accept = document.createElement('div');
            accept.innerHTML = params.accept.html;
        } else {
            accept = document.createElement('button');
            accept.setAttribute('class', "btn btn-primary");
            accept.innerHTML = locales[params.locale].accept;

            for (var i in params.accept.classes) {
                accept.classList.add(params.accept.classes[i]);
            }
        }

        accept.addEventListener("click", acceptCookies);
        
        if (params.accept.callback) {
            accept.addEventListener("click", params.accept.callback);
        }

        return accept;
    }

    function createMore() {
        var more;

        if (params.more.html) {
            more = document.createElement('div');
            more.innerHTML = params.more.html;
        } else {
            more = document.createElement('a');
            more.setAttribute('href', params.more.href);
            more.innerHTML = locales[params.locale].more;

            for (var i in params.more.classes) {
                more.classList.add(params.more.classes[i]);
            }
        }

        if (params.more.callback) {
            more.addEventListener("click", params.more.callback);
        }

        return more;
    }

    function acceptCookies() {
        //console.log('Cookies accepted');

        setCookie("acceptCookies", true, params.expires);
        instance.classList.remove('show');
    }

    // Cookie functions from w3schools
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    /**
     * Utility method to extend defaults with user options
     * @param source
     * @param properties
     * @returns {*}
     */
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                if (typeof source[property] === 'object') {
                    source[property] = extendDefaults(source[property], properties[property]);
                } else {
                    source[property] = properties[property];
                }
            }
        }
        return source;
    }
};

window.BsCookieNotice = BsCookieNotice;