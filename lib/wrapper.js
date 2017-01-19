'use strict'

const BehaviorSystem = require('behavior-system')
const NULL = undefined

const Plugin = {

  VERSION: '1.0.0',

  init (config = {}) {
    this._system = new BehaviorSystem()
    this._filter = config.filter
  },

  enable (gameObject) {
    const filter = this._filter
    let enabled = false

    if (filter !== NULL) {
      if (filter(gameObject) === true) {
        enabled = this._system.enable(gameObject)
      }
    } else {
      enabled = this._system.enable(gameObject)
    }

    if (enabled === true && gameObject.events !== NULL && gameObject.events.onDestroy !== NULL) {
      gameObject.events.onDestroy.add(this._onDestroyCallback, this._system)
    }

    return enabled
  },

  disable (gameObject, removeListener = true) {
    const disabled = this._system.disable(gameObject)
    if (disabled === true && removeListener === true) {
      if (gameObject.events !== NULL && gameObject.events.onDestroy !== NULL) {
        gameObject.events.onDestroy.remove(this._onDestroyCallback, this._system)
      }
    }
    return disabled
  },

  preUpdate () {
    this._system.globalProcessAll('preUpdate', this.game, this.game.time.physicsElapsed)
  },

  update () {
    this._system.globalProcessAll('update', this.game, this.game.time.physicsElapsed)
    this._system.globalProcessAll('postUpdate', this.game, this.game.time.physicsElapsed)
  },

  render () {
    this._system.globalProcessAll('preRender', this.game)
    this._system.globalProcessAll('render', this.game)
  },

  postRender () {
    this._system.globalProcessAll('postRender', this.game)
  },

  _onDestroyCallback (gameObject) {
    this.disable(gameObject, false)
  }
}

if (window.Phaser) window.Phaser.Plugin.Behavior = Plugin

module.exports = Plugin
