/* global Phaser */
'use strict'

var BehaviorSystem = require('behavior-system')

var plugin = function (game, parent, config) {
  Phaser.Plugin.call(this, game, parent)
  this._config = config || {};
  this._system = new BehaviorSystem()
}

plugin.VERSION = '0.1.0'

plugin.prototype = Object.create(Phaser.Plugin)

plugin.prototype.enable = function (gameObject) {
  if (this._config.filter && this._config.filter(gameObject) === true) {
    this._system.enable(gameObject)
    // disable the system if the game object is destroyed
    if (gameObject.events && gameObject.events.onDestroy) {
      gameObject.events.onDestroy.add(onDestroyCallback, this._system)
    }
    return true
  }
  return false
}

plugin.prototype.disable = function (gameObject) {
  this._system.disable(gameObject)
}

plugin.prototype.preUpdate = function () {
  this._system.processAll('preUpdate')
}

plugin.prototype.update = function () {
  this._system.processAll('update')
}

plugin.prototype.render = function () {
  this._system.processAll('render')
}

plugin.prototype.postRender = function () {
  this._system.processAll('postRender')
}

function onDestroyCallback (object) {
  this.disable(object)
}

if (window.Phaser) window.Phaser.Plugin.Behavior = plugin

module.exports = plugin
