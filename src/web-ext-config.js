module.exports = {
    // Global options:
    verbose: false,
    // Command options:
    build: {
        overwriteDest: true,
    },
    run: {
        firefox: 'firefoxdeveloperedition',
        // browserConsole: true,
        // devtools: true,
        pref: [
            'general.useragent.locale=es-MX'
        ],
        startUrl: [
            'https://es.aliexpress.com/item/1005005424987520.html',
            'https://es.aliexpress.com/item/1005005913925017.html',
            'https://es.aliexpress.com/item/1005006016288213.html',
            'https://es.aliexpress.com/item/1005006427599086.html',
            'https://es.aliexpress.com/item/1005006113315011.html',
            'https://es.aliexpress.com/item/1005006485810735.html',
            'https://es.aliexpress.com/item/1005006296391749.html',
            'https://es.aliexpress.com/item/1005002724686123.html',
            'https://es.aliexpress.com/item/1005005714394639.html',
            'https://es.aliexpress.com/item/1005004787627817.html',
            'https://es.aliexpress.com/item/1005005709028962.html',
        ]
    },
};