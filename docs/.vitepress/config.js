export default {
    title: 'Tezign DAM Plugin',
    themeConfig: {
        nav: [
            { text: 'plugins', link: '/guide/' },
        ],
        // sidebar: {
        //     '/plugins/': [
        //         {
        //             text: 'Plugins',
        //             collapsed: false,
        //             items: [
        //                 { text: 'introduction', link: '/plugins/introduction' },
        //                 { text: 'example', link: '/plugins/example/' },
        //             ]
        //         }
        //     ]
        // },
        sidebar: {
            '/guide': [
                {
                    text: 'Introduction',
                    items: [
                        { text: 'What is DAM plugin', link: '/guide/introduction' },
                        { text: 'Getting Started', link: '/guide/getting-started' },
                        { text: 'Slot List', link: '/guide/available-slots' },
                        { text: 'Entry Slot', link: '/guide/entry' },
                        { text: 'Iframe Bridge', link: '/guide/iframe-bridge' },
                    ]
                },
                {
                    text: 'Plugin',
                    items: [
                        { text: 'Plugin Type', link: '/guide/plugin-index' },
                        { text: 'Communication', link: '/guide/communication' },
                    ]
                }
            ],
            
        },
        footer: {
            copyright: 'Copyright © 2023 Tezign'
        },
        lastUpdatedText: 'Updated Date'
    },
}