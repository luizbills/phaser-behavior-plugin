# Behavior

A [Phaser](http://phaser.io) Plugin inspired by Construct2 behaviors.

## Install

`npm install phaser-plugin-behavior --save`

```html
<script src="path/to/phaser.js"></script>
<script src="path/to/phaser-plugin-behavior.js"></script>
<script src="path/to/your-game.js"></script>
```

## Usage

```js
// create a behavior
var sampleBehavior = {

  // default options of the behavior
  opts: {
    key: 'value'
  },

  create: function(object, options, game) {
    // called when the behavior is ADDED to a game object
  },
  
  destroy: function(object, options, game) {
    // called when the behavior is REMOVED to a game object
  },
  
  preUpdate: function(object, options, game) {
    // called at the very start of the update cycle,
    // before any other subsystems have been updated (including Physics)
  },
  
  update: function(object, options, game) {
    // called after all the core subsystems (Input, Tweens, Sound, etc) 
    // and the State have updated, but before the render
  },
  
  render: function(object, options, game) {
    // called right after the Game Renderer completes, but before the State.render
  },
  
  postRender: function(object, options, game) {
    // alled after the Game Renderer and State.render have run
  }
}

// initialize the plugin
var behaviorPlugin = game.plugins.add(Phaser.Plugin.Behavior)

// add the behavior system to any object (e.g. a sprite)
behaviorPlugin.enable(myObject)

// add a behavior
myObject.behaviors.add('my_awesome_key', // a behavior instance key/identifier
  sampleBehavior, // the behavior instance key/identifier
  { key: 'value' } // configuration
)

// remove a behavior
myObject.behaviors.remove('my_awesome_key')

// add others behaviors... be criative!
myObject.behaviors.add('fire ball', behaviorSpell, { damage: 300 })
myObject.behaviors.add('frost nova', behaviorSpell, { damage: 100, slow: 0.4 })
myObject.behaviors.add('invulnerability', behaviorImortal, { duration: 150 })
```

### [DEMO](http://codepen.io/luizbills/full/MKGLqZ/)
