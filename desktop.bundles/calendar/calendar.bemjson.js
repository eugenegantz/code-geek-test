module.exports = {
    block : 'page',
    title : 'Title of the page',
    favicon : '/favicon.ico',
    head : [
        { elem : 'meta', attrs : { name : 'description', content : '' } },
        { elem : 'meta', attrs : { name : 'viewport', content : 'width=device-width, initial-scale=1' } },
        { elem : 'css', url : 'calendar.min.css' }
    ],
    scripts: [
        { elem : 'js', url : 'calendar.min.js' },
        { elem : 'js', url : 'calendar.bemhtml.js' },
        { elem : 'js', url : 'jquery-2.1.0.min.js' }
    ],
    content : [{
        block: 'p-calendar'
    }]
};
