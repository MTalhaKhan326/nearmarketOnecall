import { isValidJSON } from "./helpers.js";

async function callHandler(funcName, args = []) {
    if(typeof funcName !== 'string' || !Array.isArray(args)) {
        return null;
    }
    return window.flutter_inappwebview?.callHandler(funcName, args)
}
const FlutterInterface = {
    getUserId: async () => {
        try {
            let res = await window.flutter_inappwebview?.callHandler('getUserId', [])
            return (typeof res === 'string' ? res : null)
        } catch(e) {
            return null 
        }
    },
    getLocation: async () => {
        try {
            let res = await callHandler('getLocation')
            console.log(typeof res);
            console.log(res);
            if(typeof res === 'string' && isValidJSON(res)) {
                return JSON.parse(res)
            }
            if(typeof res === 'object') {
                return res 
            }
            return null 
        } catch(e) {
            return null 
        }
    },
    askCameraPermission: async () => {
        try {
            let res = await callHandler('askPermissions', ['camera'])
            console.log(res);
            console.log(typeof res)
            if(typeof res === 'string' && isValidJSON(res)) {
                res = JSON.parse(res)
            }
            if(typeof res !== 'object' || !res) {
                return false;
            }
            console.log(typeof res.camera)
            console.log(res.camera)
            if(res.camera) {
                return (res.camera === true || res.camera === 'true')
            }
            return false 
        } catch(e) {
            return false 
        }
    }
}

export default FlutterInterface