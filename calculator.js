import { Memory } from "./memory";
export const Calculator = {
    tokenize(str) {
        return str.replace(/\s+/g, '').match(/\d+|[a-zA-Zа-яА-Я]+|[\+\-\*\/\%\(\)]/g) || [];
    },
    sorting(tokens) {
        const output = [];
        const stack = [];
        const ops = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 2 };

        tokens.forEach(token => {
            if (/\d+/.test(token)) output.push({ type: 'int', val: parseInt(token) });
            else if (/[a-zA-Zа-яА-Я]/.test(token)) output.push({ type: 'var', val: token });
            else if (token === '(') stack.push(token);
            else if (token === ')') {
                while (stack.length && stack[stack.length - 1] !== '(') output.push(stack.pop());
                stack.pop();
            } else {
                while (stack.length && ops[stack[stack.length - 1]] >= ops[token]) output.push(stack.pop());
                stack.push(token);
            }
        });
        while (stack.length) output.push(stack.pop());
        return output;
    },

    evaluate(expressionStr) {
        const tokens = this.tokenize(expressionStr);
        const rps = this.sorting(tokens);
        const stack = [];

        rps.forEach(node => {
            if (node.type === 'int') stack.push(node.val);
            else if (node.type === 'var') stack.push(Memory.get(node.val));
            else {
                const b = stack.pop();
                const a = stack.pop();
                switch (node) {
                    case '+': stack.push(a + b); break;
                    case '-': stack.push(a - b); break;
                    case '*': stack.push(a * b); break;
                    case '/': stack.push(b === 0 ? 0 : Math.trunc(a / b)); break;
                    case '%': stack.push(b === 0 ? 0 : a % b); break;
                }
            }
        });
        return stack[0] || 0;
    }
}
