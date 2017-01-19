var app = {} // just a namespace

app.game = new Phaser.Game(400, 400, Phaser.AUTO, '', {
  create: function() {
    app.behaviorPlugin = app.game.plugins.add(Phaser.Plugin.Behavior)

    app.actor = app.game.add.sprite(0, 0, 'actor')
    app.actor.anchor.set(0.5)

    var enabled = app.behaviorPlugin.enable(app.actor)
    if (enabled === true) {
      app.actor.behaviors.set('mov', app.BehaviorBullet, {
        angle: Math.PI / 4, // 45 degrees
        speed: 75,
        rotate: true
      })
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
