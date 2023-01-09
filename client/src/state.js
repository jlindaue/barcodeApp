import {atom,selector} from 'recoil';

export const loginState = atom({
    key: 'userState', // unique ID (with respect to other atoms/selectors)
    default: "login", // default value (aka initial value)
});
