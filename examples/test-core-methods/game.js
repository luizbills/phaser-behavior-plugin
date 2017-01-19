var app = {} // just a namespace

app.game = new Phaser.Game(400, 400, Phaser.AUTO, '', {
  create: function() {
    app.behaviorPlugin = app.game.plugins.add(Phaser.Plugin.Behavior)

    app.actor = app.game.add.sprite(0, 0, 'actor')

    var enabled = app.behaviorPlugin.enable(app.actor)
    if (enabled === true) {
      app.actor.behaviors.set('b', app.BehaviorTest)
      var start = Date.now()
      setTimeout(function () {
        app.actor.behaviors.process('b', 'final', Date.now() - start )
        app.behaviorPlugin.disable(app.actor)
      }, 2000)
    }
  }
})

// the behavior
app.BehaviorTest = {

  // defaults settings
  options: {},

  create: function (entity, opts) {
    console.log('create')
  },

  destroy: function (entity, opts) {
    console.log('destroy')
  },

  preUpdate: function (entity, opts, game, dt) {
    console.log('preUpdate')
  },

  update: function (entity, opts, game, dt) {
    console.log('update')
  },

  postUpdate: function (entity, opts, game, dt) {
    console.log('postUpdate')
  },

  preRender: function (entity, opts, game) {
    console.log('preRender')
  },

  render: function (entity, opts, game) {
    console.log('render')
  },

  postRender: function (entity, opts, game) {
    console.log('postRender')
  },

  final: function (entity, opts, time) {
    console.log('end:', time)
  }
}
