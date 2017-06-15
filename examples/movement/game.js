var app = {} // just a namespace

app.game = new Phaser.Game(400, 400, Phaser.AUTO, '', {
  preload: function () {
    this.load.crossOrigin = "Anonymous";
    this.load.image('actor', '../assets/square.png');
  },

  create: function() {
    // initialize the plugin
    app.behaviorPlugin = app.game.plugins.add(Phaser.Plugin.Behavior)

    // setup a sprite
    app.actor = app.game.add.sprite(0, 0, 'actor')
    app.actor.anchor.set(0.5)

    // enable the plugin on our sprite
    var enabled = app.behaviorPlugin.enable(app.actor)
    
    if (enabled === true) {
      app.actor.behaviors.set('mov', app.BehaviorBullet, {
        angle: Math.PI / 4, // 45 degrees
        speed: 75,
        rotate: true
      })
    }
  },

  update: function () {
    if (this.game.input.activePointer.isDown) {
      if ( !app.actor.behaviors.isPaused('mov') ) app.actor.behaviors.pause('mov')
    } else {
      if ( app.actor.behaviors.isPaused('mov') ) app.actor.behaviors.resume('mov')
    }
  }
})

// the behavior
app.BehaviorBullet = {
  // defaults settings
  options: {
    angle: 0,
    speed: 100,
    rotate: true
  },

  create: function(entity, opts) {
    if (opts.rotate) {
      entity.rotation = opts.angle;
    }
  },

  update: function(entity, opts, game, dt) {
    entity.x += Math.cos(opts.angle) * opts.speed * dt
    entity.y += Math.sin(opts.angle) * opts.speed * dt
  }
}
