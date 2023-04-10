export default {
    title: 'Tezign DAM Plugin',
    themeConfig: {
        nav: [
            { text: 'Plugins', link: '/guide/introduction' },
            {text: '联系开发者', link: '/contact/member' },
             {text: 'beta-0.0.0', link: ''}
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
                },
                {
                    text: 'Examples',
                    items: [
                        { text: '流程简介&简单范例', link: '/guide/example-readiness' },
                    ]
                },
                {
                    text: 'CLI',
                    items: [
                        { text: 'Working in progress', link: '/' },
                    ]
                }
            ],
            
        },
        footer: {
            copyright: 'Copyright © 2023 Felix Zhang',
        },
        lastUpdatedText: 'Updated Date'
    },
}