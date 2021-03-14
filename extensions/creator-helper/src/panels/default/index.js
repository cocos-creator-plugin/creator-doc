const Fs = require('fs');
const Path = require('path');

exports.template = Fs.readFileSync(Path.join(__dirname, 'index.html'), 'utf-8');
exports.style = Fs.readFileSync(Path.join(__dirname, 'index.css'), 'utf-8');
exports.$ = { app: '#app' };

exports.ready = function () {
    let Vue = require('../lib/vue.min.js');
    new Vue({
        el: this.$.app,
        data () {
            return {
                defaultCfg: {
                    docs: { name: '文档', url: 'http://docs.cocos.com/creator/manual/zh/' },
                    forum: { name: '论坛', url: 'http://forum.cocos.com/c/Creator' },
                    baidu: { name: '百度', url: 'http://www.baidu.com' }
                },
                webUrl: 'http://docs.cocos.com/creator/manual/zh/',
                curSelectUrl: '',
            };
        },
        created () {
            this.webUrl = this.defaultCfg.docs.url;
            this.curSelectUrl = this.webUrl;
        },
        methods: {
            onChangeWebUrl (event) {
                if (event) {
                    this.webUrl = event.currentTarget.value;
                }
            },
            _getWebView () {
                return this.$refs.web;
            },
            _initWebEvent () {
                let web = this._getWebView();
                if (web && !web.initEvent) {
                    web.addEventListener('did-start-loading', () => {
                    });
                    web.addEventListener('did-stop-loading', () => {
                    });
                    web.addEventListener('dom-ready', () => {
                        // web.openDevTools();
                    });
                }
            },
            onBtnClickWebGoBack () {
                this._initWebEvent();
                this._getWebView().goBack();
            },
            onBtnClickWebForward () {
                this._getWebView().goForward();
            },
            onInputWebUrlOver () {
                let url = this.webUrl;
                let isWebUrl = false;
                if (!isWebUrl) {
                    let index = this.webUrl.indexOf('http://');
                    if (index === -1) {
                        url = 'http://' + url;
                    } else {
                        isWebUrl = true;
                    }
                }

                if (!isWebUrl) {
                    let index = this.webUrl.indexOf('https://');
                    if (index === -1) {
                        url = 'https://' + url;
                    } else {
                        isWebUrl = true;
                    }
                }

                this.webUrl = url;
                this.curSelectUrl = url;
            },

        },
    });

};

