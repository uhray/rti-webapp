export const isEmpty = (val) => {
    return val.trim().length === 0;
}

export const validEmail = (val) => {
    return new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?").test(val);
}
 
export const validPass = (val) => {
    return val.length >= 6;
}

export const passMatch = (val1, val2) => {
    return val1 === val2;
}

export const validSelect = (val, val2) => {
    return val !== '';
}

export const formValid = (...args) => {
    for(const arg of args){
        if(!arg){
            return true
        }
    }
    return false;
}