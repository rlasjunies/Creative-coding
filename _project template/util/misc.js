export function defined(variable, defaultValue){
    if(typeof variable === 'undefined') return defaultValue;
    return variable;
}