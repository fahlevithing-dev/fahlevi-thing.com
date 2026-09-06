// A tiny parser for JS object/array literals (unquoted keys, single OR
// double quoted strings, booleans) - the shape script.js's allPosts array
// is written in. Cloudflare Workers disallows eval()/new Function() for
// security, so this exists instead of just doing `new Function('return '+x)`.

export function parseJsLiteral(str) {
    let i = 0;

    function skipWs() {
        while (i < str.length && /\s/.test(str[i])) i++;
        // also skip // line comments, just in case
        while (str.slice(i, i + 2) === '//') {
            while (i < str.length && str[i] !== '\n') i++;
            while (i < str.length && /\s/.test(str[i])) i++;
        }
    }

    function parseString(quote) {
        let result = '';
        i++; // opening quote
        while (i < str.length && str[i] !== quote) {
            if (str[i] === '\\') {
                i++;
                const esc = str[i];
                const map = { n: '\n', t: '\t', r: '\r', '\\': '\\', "'": "'", '"': '"', '`': '`', b: '\b', f: '\f', v: '\v', '0': '\0' };
                result += Object.prototype.hasOwnProperty.call(map, esc) ? map[esc] : esc;
                i++;
            } else {
                result += str[i];
                i++;
            }
        }
        i++; // closing quote
        return result;
    }

    function parseValue() {
        skipWs();
        const c = str[i];
        if (c === '"' || c === "'") return parseString(c);
        if (c === '[') return parseArray();
        if (c === '{') return parseObject();
        if (str.startsWith('true', i)) { i += 4; return true; }
        if (str.startsWith('false', i)) { i += 5; return false; }
        if (str.startsWith('null', i)) { i += 4; return null; }
        const start = i;
        while (i < str.length && /[0-9eE+\-.]/.test(str[i])) i++;
        if (i === start) throw new Error(`Unexpected character "${c}" at position ${i}`);
        return parseFloat(str.slice(start, i));
    }

    function parseArray() {
        const arr = [];
        i++; // [
        skipWs();
        if (str[i] === ']') { i++; return arr; }
        for (;;) {
            arr.push(parseValue());
            skipWs();
            if (str[i] === ',') {
                i++;
                skipWs();
                if (str[i] === ']') { i++; break; }
                continue;
            }
            if (str[i] === ']') { i++; break; }
            throw new Error(`Expected , or ] at position ${i}`);
        }
        return arr;
    }

    function parseKey() {
        skipWs();
        const c = str[i];
        if (c === '"' || c === "'") return parseString(c);
        const start = i;
        while (i < str.length && /[a-zA-Z0-9_$]/.test(str[i])) i++;
        if (i === start) throw new Error(`Expected object key at position ${i}`);
        return str.slice(start, i);
    }

    function parseObject() {
        const obj = {};
        i++; // {
        skipWs();
        if (str[i] === '}') { i++; return obj; }
        for (;;) {
            const key = parseKey();
            skipWs();
            if (str[i] !== ':') throw new Error(`Expected : at position ${i}`);
            i++;
            obj[key] = parseValue();
            skipWs();
            if (str[i] === ',') {
                i++;
                skipWs();
                if (str[i] === '}') { i++; break; }
                continue;
            }
            if (str[i] === '}') { i++; break; }
            throw new Error(`Expected , or } at position ${i}`);
        }
        return obj;
    }

    const result = parseValue();
    return result;
}
