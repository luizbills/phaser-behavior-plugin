# Phaser Behavior Plugin

*[Behavior System](https://github.com/luizbills/behavior-system) wrapper for [Phaser](http://phaser.io/) games*

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### [LIVE DEMO](http://codepen.io/luizbills/pen/MKGLqZ?editors=0010)

## Install

### NPM

`npm install phaser-behavior-plugin --save`

### DIRECT DOWNLOAD

[Download Here](https://github.com/luizbills/phaser-behavior-plugin/tree/master/dist)

### CDN

```html
<script scr="//npmcdn.com/phaser-behavior-plugin@latest/dist/phaser-behavior-plugin.js"></script>
```

## Usage

> This library is UMD-compatible

```js
// create a behavior
var sampleBehavior = {

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

// add a behavior
var key = 'my awesome key' // a behavior instance key/identifier (just need be unique)
var customOptions = { key: 'another value' } // if you need/want overrides the default options of the behavior (optional)
myObject.behaviors.add(key, sampleBehavior, customOptions) // `.create` is called

// remove a behavior
myObject.behaviors.remove(key) // `.destroy` is called

// checks a behavior instance
// returns true if the object has a behavior with the key
myObject.behaviors.has(key)

// get a behavior instance
// returns the behavior instance if the object has a behavior with the key, otherwise `undefined`
myObject.behaviors.get(key)

// be creative!
// create other behaviors...
myObject.behaviors.add('fire ball', behaviorSpell, { damage: 300 })
myObject.behaviors.add('frost nova', behaviorSpell, { damage: 100, slow: 0.4 })
myObject.behaviors.add('buff:invulnerability', behaviorImortal, { duration: 15 })
myObject.behaviors.add('weapon:main-hand', behaviorWeapon, { type: 'sword', damage: 120 })
```

[LIVE DEMO](http://codepen.io/luizbills/pen/MKGLqZ?editors=0010)

## License

MIT
