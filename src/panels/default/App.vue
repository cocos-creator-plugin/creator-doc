<template>
    <div>
        <webview id="webViewElement" auto-size="on" plugins ref="web" class="web-view" :src="webUrl"></webview>
        <div class="web-tools">
            <div class="btn" @click="onBtnClickWebGoBack">
                <svg t="1529847309698" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="2046" width="20"
                     height="20">
                    <path d="M363.840919 472.978737C336.938714 497.358861 337.301807 537.486138 364.730379 561.486138L673.951902 832.05497C682.818816 839.813519 696.296418 838.915012 704.05497 830.048098 711.813519 821.181184 710.915012 807.703582 702.048098 799.94503L392.826577 529.376198C384.59578 522.174253 384.502227 511.835287 392.492414 504.59418L702.325747 223.807723C711.056111 215.895829 711.719614 202.404616 703.807723 193.674252 695.895829 184.943889 682.404617 184.280386 673.674253 192.192278L363.840919 472.978737Z" p-id="2047"></path>
                </svg>
            </div>
            <div class="btn" @click="onBtnClickWebForward">
                <svg t="1529847493188" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="2160" width="20"
                     height="20">
                    <path d="M642.174253 504.59418C650.164439 511.835287 650.070886 522.174253 641.84009 529.376198L332.618569 799.94503C323.751654 807.703582 322.853148 821.181184 330.611697 830.048098 338.370249 838.915012 351.847851 839.813519 360.714765 832.05497L669.936288 561.486138C697.36486 537.486138 697.727953 497.358861 670.825747 472.978737L360.992414 192.192278C352.26205 184.280386 338.770837 184.943889 330.858944 193.674252 322.947053 202.404616 323.610556 215.895829 332.340919 223.807723L642.174253 504.59418Z" p-id="2161"></path>
                </svg>
            </div>
            <ui-input class="url" :value="webUrl" @blur="onInputWebUrlOver"></ui-input>
            <ui-select class="large" @change="onChangeWebUrl">
                <option v-for="(item) in defaultCfg" :value="item.url">
                    {{ item.name }}
                </option>
            </ui-select>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
    components: {},
    name: 'App',
    data() {
        return {
            defaultCfg: {
                docs: {name: "文档", url: "http://docs.cocos.com/creator/manual/zh/"},
                forum: {name: "论坛", url: "http://forum.cocos.com/c/Creator"},
                baidu: {name: "百度", url: "http://www.baidu.com"}
            },
            webUrl: "http://docs.cocos.com/creator/manual/zh/",
            curSelectUrl: '',
        };
    },
    created() {
        this.webUrl = this.defaultCfg.docs.url;
        this.curSelectUrl = this.webUrl;
    },
    methods: {
        onChangeWebUrl(event: Event) {
            if (event) {
                const element = event.currentTarget as HTMLSelectElement;
                this.webUrl = element.value;
            }
        },
        _getWebView(): any {
            return this.$refs.web;
        },
        _initWebEvent() {
            let web: any = this._getWebView();
            if (web && !web.initEvent) {
                web.addEventListener('did-start-loading', () => {
                });
                web.addEventListener('did-stop-loading', () => {
                });
                web.addEventListener('dom-ready', () => {
                    // web.openDevTools();
                })
            }
        },
        onBtnClickWebGoBack() {
            this._initWebEvent();
            this._getWebView().goBack();
        },
        onBtnClickWebForward() {
            this._getWebView().goForward();
        },
        onInputWebUrlOver() {
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
                    url = "https://" + url;
                } else {
                    isWebUrl = true;
                }
            }

            this.webUrl = url;
            this.curSelectUrl = url;
        },

    },
});

</script>

<style scoped>
.web-view {
    position: absolute;
    top: 30px;
    bottom: 0;
    width: 100%;
}

.url {
    flex: 1;
}

.btn {
    cursor: pointer;
    border: 1px solid #333333;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
}

.btn:hover {
    border: 1px solid #999999;
}

.web-tools {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
}
</style>
