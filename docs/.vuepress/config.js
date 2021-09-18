module.exports = {
    lang: 'zh-CN',
    title: '进化树说明文档！',
    description: '这是我的第一个 VuePress 站点',

    themeConfig: {
        logo: 'https://vuejs.org/images/logo.png',
    },
    plugins: [
        [
            '@vuepress/plugin-search',
            {
                locales: {
                    '/': {
                        placeholder: 'Search',
                    },
                    '/zh/': {
                        placeholder: '搜索',
                    },
                },
            },
        ],
    ],
}

