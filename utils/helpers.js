//Can be used inside handlebars expressions, eg {{{log argument}}}
let helpers = {
    stringify: (value) => JSON.stringify(value),
    log: (message) => console.log(message)
}

module.exports = helpers;