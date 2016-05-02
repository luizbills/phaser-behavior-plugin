/* global Phaser */
'use strict'

var BehaviorSystem = require('behavior-system')

var plugin = function (game, parent) {
  Phaser.Plugin.call(this, game, parent)
  this._system = new BehaviorSystem()
}

plugin.prototype = Object.create(Phaser.Plugin)

plugin.prototype.enable = function (gameObject) {
  this._system.enable(gameObject)
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

if (window.Phaser) window.Phaser.Plugin.Behavior = plugin

module.exports = plugin
