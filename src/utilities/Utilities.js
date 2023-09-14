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