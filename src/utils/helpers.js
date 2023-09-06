import axios from "axios";
import { browserName, deviceType, mobileModel, osName } from "react-device-detect";

export const convertMySqlDateToReadable = (date) => {
    date = new Date(date)
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear() === (new Date()).getFullYear() ? null : date.getFullYear()
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    return (month) + " " + date.getDate() + (year ? `, ${year}` : '') + (!year ? ", " : " ") + time
}

export function convertMongoDateToReadable(dateString) {
    const date = new Date(dateString)
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate()
    const year = date.getFullYear().toString().substr(-2)
    const hour = date.getHours().toString().length === 1 ? `0${date.getHours()}` : date.getHours()
    const mins = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes()
    return `${hour}:${mins} ${month} ${day}, ${year}` 
}

export const range = (size, startAt = 0) => {
    return [...Array(size).keys()].map(i => i + startAt);
}

export const titleCase = (str) => {
    return str.split(" ").map(word => {
        const letters = word.split("")
        return letters[0].toUpperCase() + letters.slice(1).join("").toLowerCase()
    }).join(" ")
}

export const formatNumberAsReadable = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const removeSpecialCharacters = (str) => {
    return str.replace(/[^A-Za-z0-9\_\- ]/g, '')
}

export const arrayUniqueByKey = (array, key) => {
    return [...new Map(array.map(item => [item[key], item])).values()];
}

export const isValidLatitude = (lat) => {
    return !isNaN(lat) && isFinite(lat) && Math.abs(lat) <= 90;
}

export const isValidLongitude = (lng) => {
    return !isNaN(lng) && isFinite(lng) && Math.abs(lng) <= 180;
}

export async function createLog(tag, value) {
    try {
        if(!tag || typeof tag !== 'string') {
            throw "tag is required"
        } 
        value = {
            ...value,
            url: window.location.href,
            os: osName,
            browserName: browserName,
            mobileModel: mobileModel,
            deviceType: deviceType
        }
        const { data } = await axios.post("https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/log", {
            tag: tag,
            value: value 
        })
        if(data.status === 200) {
            return data.data ?? true 
        }
        throw "Something went wrong"
    } catch(e) {
        return null 
    }
}

export function isValidJSON(string) {
    try {
        JSON.parse(string);
    } catch (e) {
        return false;
    }
    return true;
}

export function isEmail(input) {
    // Regular expression pattern to check if the input is in email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Test the input against the regex pattern and return true if it matches, false otherwise
    return emailRegex.test(input);
}

export function getOperatingSystem(window) {
    let operatingSystem = 'Not known';
    if (window.navigator.appVersion.indexOf('Win') !== -1) { operatingSystem = 'Windows OS'; }
    if (window.navigator.appVersion.indexOf('Mac') !== -1) { operatingSystem = 'MacOS'; }
    if (window.navigator.appVersion.indexOf('X11') !== -1) { operatingSystem = 'UNIX OS'; }
    if (window.navigator.appVersion.indexOf('Linux') !== -1) { operatingSystem = 'Linux OS'; }
    return operatingSystem;
}

export function getBrowser(window) {
    let currentBrowser = 'Not known';
    if (window.navigator.userAgent.indexOf('Chrome') !== -1) { currentBrowser = 'Google Chrome'; }
    else if (window.navigator.userAgent.indexOf('Firefox') !== -1) { currentBrowser = 'Mozilla Firefox'; }
    else if (window.navigator.userAgent.indexOf('MSIE') !== -1) { currentBrowser = 'Internet Exployer'; }
    else if (window.navigator.userAgent.indexOf('Edge') !== -1) { currentBrowser = 'Edge'; }
    else if (window.navigator.userAgent.indexOf('Safari') !== -1) { currentBrowser = 'Safari'; }
    else if (window.navigator.userAgent.indexOf('Opera') !== -1) { currentBrowser = 'Opera'; }
    else if (window.navigator.userAgent.indexOf('Opera') !== -1) { currentBrowser = 'YaBrowser'; }
    else { console.log('Others'); }
    return currentBrowser;
}