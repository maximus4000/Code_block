export const Memory = {
    variables: {},
    reset() { this.variables = {}; },
    set(name, val, index=null) { 
        if(index==null) this.variables[name.trim()] = Math.trunc(val);
        else this.variables[name.trim()][index] = Math.trunc(val);
    },
    get(name, index=null) {
        if (!(name.trim() in this.variables)) throw new Error(`Переменная "${name}" не объявлена!`);
        if(index!=null) return this.variables[name.trim()][index];
        return this.variables[name.trim()];
    },
    declareArray(name, size) {
        this.variables[name.trim()] = new Array(size).fill(0);
    }
};