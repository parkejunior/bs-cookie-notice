
# Bootstrap Cookie Notice

A simple cookie consent notice alert for Bootstrap 4 without require jQuery.

- Various configuration options
- Defaults texts in PT, EN and ES
- Possibility to add extra classes and callbacks
- Does not require jQuery
- Compatible with Bootstrap 4.1.x or more recent
- It's lightweight, only ± 7 kb script

This plugin is a little bit based on [`Wruczek/Bootstrap-Cookie-Alert`](https://github.com/Wruczek/Bootstrap-Cookie-Alert).

# Installation

First, you will need to install [NPM](https://www.npmjs.com/get-npm). Then, run the following command:
```bash
$ npm install bs-cookie-notice --save
```

# Usage

## Basic
Here is a basic example of using the plugin:
```js
<script type="text/javascript">
    var notice = new BsCookieNotice();
</script>
```
Automatically opens the notice in the browser when loading the page.

## Colors
The default color is `dark`, but you can choose between it and `light`. Example:
```js
new BsCookieNotice({
    color: 'light'
});
```

## Default texts
You can change the default texts language, just by setting the `locale` property (English, Portuguese and Spanish). Example:
```js
new BsCookieNotice({
    locale: 'pt'
});
```
The default language of the plugin is English.

If you want to change the text to a custom one, you can pass an object with properties named `message`, `accept` and / or `more` to the `customMessage` property. Example:
```js
new BsCookieNotice({
    locale: 'pt',
    customMessage: {
        more: "Quero saber mais...",
        accept: "Aceitar Todos"
    }
});
```
Note that it's not necessary to pass all properties on the object, you can choose a default language and just change the text of the `Accept` button for example.

## Learn More URL
One of the indispensable things that needs to be configured is the "Learn more" link URL. For this you can pass to the `more` property an object containing an option named `href` with the URL value you want. Example:
```js
new BsCookieNotice({
    more: {
        href: "https://github.com/parkejunior",
    }
});
```

## Classes and HTML
In the same way that it's possible to configure the URL of the "Learn More" link, it's also possible to configure the "Accept" button.

You can add custom classes for these elements by passing an object to the `more` (for "Learn More") and `accept` (for the "Accept" button) properties. For example, changing the color of the button using the Bootstrap class:
```js
new BsCookieNotice({
    accept: {
        class: ["btn-danger"],
    }
});
```
Or add a custom color for the link:
```js
new BsCookieNotice({
    more: {
        href: "https://github.com/parkejunior",
        class: ["text-warning", "another-classes"],
    }
});
```
## Callbacks
It's also possible to add callbacks to the "Accept" button and the "Learn More" link. Example: 
```js
new BsCookieNotice({
    accept: {
        callback: function () {
            console.log("User accept cookies");
        }
    },
    more: {
        href: "https://github.com/parkejunior",
        callback: function () {
            console.log("User wants to learn more");
        }
    }
});
```
Note: You cannot override the default "Accept" button event, just add a callback.

## Expire
The default notice hide expiration time is 365 days after acceptance. You can change this by passing the number of days to the `expire` property. Example:
```js
new BsCookieNotice({
    expire: 30
});
```
In this example, after 30 days after the user accepts the cookies, the message will be displayed again and the user must accept it again.

# Demo
You can test the plugin by opening the `index.html` file in your browser.

# Contribution
If you find any incorrect English grammar or any suggestions on how to improve the plugin, I appreciate it.
