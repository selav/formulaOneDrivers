module.exports ={
    wrap: fn => (...args) => fn(...args).catch(args[2]) //call next(err) on Error, reference: https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
}