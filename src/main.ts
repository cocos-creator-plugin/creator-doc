/**
 * @en Registration method for the extended master process
 * @zh 为扩展的主进程的注册方法
 */

// @ts-ignore
import {name} from '../package.json'

export const methods = {
    open_panel() {
        Editor.Panel.open(name);
    }

};

/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
export const load = function () {
};

/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
export const unload = function () {
};
