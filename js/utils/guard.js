
class ArgumentGuard {
    constructor() {
        this.error_codes = {
            m0: () => `Not Found #1`,
            m1: () => `Not Found #2`
        };
    }

    throwError(code, params) {
        let error_function = this.error_codes[code];
        throw new Error(error_function(params));
    }

    array(arg, code, params) {
        if (!Array.isArray(arg)) {
            this.throwError(code, params);
        }
        return this;
    }

    object(arg, code, params) {
        if (typeof arg !== 'object' || arg === null) {
            this.throwError(code, params);
        }
        return this;
    }

    function(arg, code, params) {
        if (typeof arg !== 'function') {
            this.throwError(code, params);
        }
        return this;
    }

    notEmptyString(arg, code, params) {
        if (typeof arg !== 'string' || !arg.length) {
            this.throwError(code, params);
        }
        return this;
    }

    true(arg, code, params) {
        if (!arg) {
            this.throwError(code, params);
        }
        return this;
    }

    false(arg, code, params) {
        if (arg) {
            this.throwError(code, params);
        }
        return this;
    }
}

// export default new ArgumentGuard();