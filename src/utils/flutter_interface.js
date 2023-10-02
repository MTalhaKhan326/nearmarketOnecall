import { isValidJSON } from "./helpers.js";

async function callHandler(funcName, args = []) {
    if(typeof funcName !== 'string' || !Array.isArray(args)) {
        return null;
    }
    console.log('window.flutter_inappwebview', typeof window.flutter_inappwebview )
    return window.flutter_inappwebview?.callHandler(funcName, ...args)
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
    getBusinessId: async () => {
        try {
            let res = await callHandler('getBusinessId')
            if(typeof res === 'string' && res.length) {
                return res 
            }
            return null 
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
    },
    goToLoginScreen: async () => {
        try {
            let res = await callHandler('goToLoginScreen')
            console.log(res)
            return true;
        } catch(e) {
            console.log(e)
            return false;
        }
    },
    updateBusinessInsideApp: async (businessId) => {
        try {
            if(!businessId) {
                throw new Error('no business id')
            }
            if(typeof businessId !== 'string') {
                throw new Error('business id must be a string')
            }
            let res = await callHandler("updateBusinessInsideApp", [businessId])
            return res;
        } catch(e) {
            return false;
        }
    }
}

export default FlutterInterface