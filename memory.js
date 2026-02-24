export const Memory = {
    variables: {},
    reset() { this.variables = {}; },
    set(name, val) { this.variables[name.trim()] = Math.trunc(val); },
    get(name) {
        if (!(name.trim() in this.variables)) throw new Error(`Переменная "${name}" не объявлена!`);
        return this.variables[name.trim()];
    }
};