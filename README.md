# Phaser Behavior Plugin

*[Behavior System](https://github.com/luizbills/behavior-system) wrapper for [Phaser](http://phaser.io/) games*

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### [LIVE DEMO](http://codepen.io/luizbills/pen/MKGLqZ?editors=0010)

## Install

### NPM

`npm install phaser-behavior-plugin --save`

### DOWNLOAD

[Download Here](https://github.com/luizbills/phaser-behavior-plugin/tree/master/dist)

### CDN

```html
<script scr="//unpkg.com/phaser-behavior-plugin@latest/dist/phaser-behavior-plugin.js"></script>
```

## Usage

> This library is UMD-compatible

```js
// create a behavior
var Behavior = {

  // settings of the behavior
  options: {
    key: 'value'
  },

  create: function(object, options) {
    // called when the behavior is ADDED to a game object
  },

  destroy: function(object, options) {
    // called when the behavior is REMOVED from a game object
  },

  preUpdate: function(object, options) {
    // called at the very start of the update cycle,
    // before any other subsystems have been updated (including Physics)
  },

  update: function(object, options) {
    // called after all the core subsystems (Input, Tweens, Sound, etc)
    // and the State have updated, but before the render
  },

  render: function(object, options) {
    // called right after the Game Renderer completes, but before the State.render
  },

  postRender: function(object, options) {
    // called after the Game Renderer and State.render have run
  }
}

// initialize the plugin
var behaviorPlugin = game.plugins.add(BehaviorPlugin)
/*
 * or (if Phaser is a global)
 * var behaviorPlugin = game.plugins.add(Phaser.Plugin.Behavior)
 */

// a dummy
var myObject = game.create.sprite(0, 0, 'dummy')

// add the behavior system to any object (not just sprites)
behaviorPlugin.enable(myObject)


// all behavior instances must have a identifier/key. This id just need to be unique.
var id = 'my awesome key'

// You can to override the default options a behavior instance, if you want/need (optional)
var customOptions = { key: 'another value' }

// add a behavior
myObject.behaviors.set(id, Behavior, customOptions) // `.create` is called

// checks if a object has a behavior instance
// returns true if the object has a behavior with the key
myObject.behaviors.has(id)

// get a behavior instance
// returns the behavior instance if the object has a behavior with the key, otherwise `undefined`
myObject.behaviors.get(id)

// remove a behavior instance corresponding to this key
myObject.behaviors.remove(id) // `.destroy` is called if a behavior instance is removed

// now be creative!
// create other behaviors...
myObject.behaviors.set('fire ball', behaviorSpell, { damage: 300 })
myObject.behaviors.set('frost nova', behaviorSpell, { damage: 100, slow: 0.4 })
myObject.behaviors.set('buff:invulnerability', behaviorImortal, { duration: 15 })
myObject.behaviors.set('weapon:main-hand', behaviorWeapon, { type: 'sword', damage: 120 })
```

[LIVE DEMO](http://codepen.io/luizbills/pen/MKGLqZ?editors=0010)

## List of Behaviors


| Behavior | Description |
|---|---|
| [Bullet](https://github.com/luizbills/phaser-behaviors/tree/master/bullet) | moves an game object forwards at an angle |
| [Collision Handler](https://github.com/luizbills/phaser-behaviors/tree/master/collision-handler) | handles collisions | 

## License

MIT
