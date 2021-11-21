const Presidents = require("../models/presidents")
const { findIndex, last, isUndefined } = require("lodash")
const { v4 } = require("uuid")


let _read = options => (options && !isUndefined(options.id)) ? Presidents.filter(p => p.id === options.id)[0] : Presidents


let _update = options  => {
    let result
    let index = findIndex( Presidents, p => p.id === options.id )
    if ( index >= 0 ) {
        Presidents[index] = options
        result = Presidents[index]
    }

    return result
}

let _create = options => {
    options.id = v4()
    Presidents.push( options )
    return last( Presidents )
}

let _delete = options => {
    let result
    let index = findIndex( Presidents, p => p.id === options.id )
    if ( index >= 0 ) {
        result = Presidents.splice( index, 1 )
    }
    return result
}


module.exports = {
    create: _create,
    read: _read,
    update: _update,
    delete: _delete
}