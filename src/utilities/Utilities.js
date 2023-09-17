import jwtDecode from "jwt-decode";
import { wearDictionary } from "../objects/commonObjects";

export function convertWear(wear) {
    return(wearDictionary[wear]);
}

export function getUserId() {
    const auth_token = sessionStorage.getItem('auth_token');
    const decoded = jwtDecode(auth_token);
    return decoded.user.id;
}

export function renderOptions(options) {
    return options.map((option, index) => (
        <option key={index}>{option}</option>
    ));
}

export function currentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeFormat = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return timeFormat;
}