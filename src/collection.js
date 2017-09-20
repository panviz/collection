/**
 * Collection object
 * Operates on ids of data items
 * @event add fires on items added to collection
 * @event remove fires on items removed from collection
 * @event change fires on items collection changed
 */
import _ from 'lodash'
import EventEmitter from 'eventemitter3'

export default class Collection extends EventEmitter {
  constructor () {
    super()
    this._items = []
  }
  /**
   * @param {ID or Array} items
   */
  add (itemS) {
    let items = _.castArray(itemS)
    // Do not add existing items and non String values
    items = _.filter(items, item => _.isString(item) && item && !_.includes(this._items, item))
    if (_.isEmpty(items)) return []

    this._items = _.union(this._items, items)

    this.emit('add', items)
    this.emit('change', items)
    return items
  }

  get (id) {
    return this._items.indexOf(id) > -1
  }

  getAll () {
    return _.clone(this._items)
  }

  getCount () {
    return this._items.length
  }

  remove (itemS) {
    let items = _.castArray(itemS)
    items = _.filter(items, item => _.isString(item) && item && _.includes(this._items, item))
    if (_.isEmpty(items)) return []

    this._items = _.difference(this._items, items)

    this.emit('remove', items)
    this.emit('change', items)
    return items
  }

  clear () {
    if (_.isEmpty(this._items)) return []

    const removed = this._items
    this._items = []

    this.emit('remove', removed)
    this.emit('change', removed)
    return removed
  }
}
