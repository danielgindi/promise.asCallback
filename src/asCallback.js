'use strict';

const emptyFunction = function(){};

/**
 * @param {Promise} promise
 * @param {function} cb
 * @return {function}
 */
function onThenSingle (promise, cb) {

    return function (val) {
        if (val === undefined) {
            setImmediate(function () {
                cb.call(promise, null);
            });
        } else {
            setImmediate(function () {
                cb.call(promise, null, val);
            });
        }
    };

}

/**
 * @param {Promise} promise
 * @param {function} cb
 * @return {function}
 */
function onCatch (promise, cb) {

    return function (err) {

        if (!err) {
            const newError = new Error(err + "");
            newError.cause = err;
            err = newError;
        }

        setImmediate(function () {
            cb.call(promise, err);
        });
    };

}

/**
 * Converts the promise to a callback.
 * If an error is thrown then it is passed to the callback as it's first argument.
 * @function
 * @param {Promise} promise
 * @param {function} cb
 */
function asCallback (promise, cb) {
    if (cb === undefined) {
        cb = emptyFunction;
    } else if (typeof cb !== 'function') {
        throw new Error('The second argument to `promisify` must be a function callback.');
    }

    this
        .then(onThenSingle(/**@type {Promise}*/ promise, cb))
        .catch(onCatch(/**@type {Promise}*/ promise, cb));
}

/**
 * Patches `Promise` prototype to have chainable `asCallback` function.
 */
asCallback.patch = function () {

    /**
     * Converts the promise to a callback.
     * If an error is thrown then it is passed to the callback as it's first argument.
     * @name Promise.prototype.asCallback
     * @function
     * @param {function} cb
     */

    Object.defineProperty(
        Promise.prototype,
        'asCallback',
        {
            writable: true,
            configurable: true,
            enumerable: false,

            value: function asCallback (cb) {
                if (cb === undefined) {
                    cb = emptyFunction;
                } else if (typeof cb !== 'function') {
                    throw new Error('The first argument to `asCallback` must be a function callback.');
                }

                this
                    .then(onThenSingle(/**@type {Promise}*/ this, cb))
                    .catch(onCatch(/**@type {Promise}*/ this, cb));
            }
        }
    );

};

module.exports = asCallback;