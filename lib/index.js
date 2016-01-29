const assign = require('core-js/library/fn/object/assign')
const Map = require('core-js/library/fn/map')

const error = {
  onAdd: (key) => new Error(`[Phaser Plugin Behavior] key "${key}" already exists`),
  onRemove: (key) => new Error(`[Phaser Plugin Behavior] key "${key}" don't exists`)
}

class BehaviorManager {
  // constructor :: (gameObject: Object, parent: Object) => BehaviorManager
  constructor(gameObject, plugin) {
    this.gameObject = gameObject
    this.plugin = plugin
    this._refs = {}
  }
  
  // add :: (key: String, behavior: Object, opts = null: Object)
  add(key, behavior, opts = null) {
    if (this.has(key)) {
      throw error.onAdd(key)
    }

    const ref = this._refs[key] = {
      behavior,
      opts: assign({}, behavior.opts, opts)
    }
    
    if (behavior.create) behavior.create.call(null, this.gameObject, ref.opts, this.plugin.game)
  }
  
  // remove :: (key: String)
  remove(key) {
    if (!this.has(key)) {
      throw error.onRemove(key)
    }
    const ref = this.get(key)
    if (ref.behavior.destroy) ref.behavior.destroy.call(null, this.gameObject, ref.opts, this.plugin.game)
    delete this._refs[key]
  }
  
  // get :: (key: String)
  get(key) {
    return this._refs[key]
  }
  
  // has :: (key: String)
  has(key) {
    return !!this._refs[key]
  }
}

class BehaviorPlugin extends Phaser.Plugin {
  // constructor :: (game: Phaser.Game, parent: Phaser.PluginManager) => BehaviorPlugin
  constructor(game, parent) {
    super(game, parent)
    this._children = new Map()
    //this.events = {
      //update: new Phaser.Signal(),
      //render: new Phaser.Signal()
    //}
  }
  
  // enable :: (gameObject: Object)
  enable(gameObject) {
    if (this._children.has(gameObject)) {
      throw new Error(`[Phaser Plugin Behavior] behavior already enabled in this Object`)
    }
    gameObject.behaviors = new BehaviorManager(gameObject, this)
    this._children.set(gameObject, gameObject.behaviors._refs)
  }
  
  // disable :: (gameObject: Object)
  disable(gameObject) {
    this._children.remove(gameObject)
  }
  
  preUpdate() {
    for(const [obj, refs] of this._children) {
      for (const key in refs) {
        const ref = refs[key]
        const fn = ref.behavior.preUpdate
        if (fn) fn.call(null, obj, ref.opts, this.game)
      }
    }
  }
  
  update() {
    for(const [obj, refs] of this._children) {
      for (const key in refs) {
        const ref = refs[key]
        const fn = ref.behavior.update
        if (fn) fn.call(null, obj, ref.opts, this.game)
      }
    }
  }
  
  render() {
    for(const [obj, refs] of this._children) {
      for (const key in refs) {
        const ref = refs[key]
        const fn = ref.behavior.render
        if (fn) fn.call(null, obj, ref.opts, this.game)
      }
    }
  }
  
  postRender() {
    for(const [obj, refs] of this._children) {
      for (const key in refs) {
        const ref = refs[key]
        const fn = ref.behavior.postRender
        if (fn) fn.call(null, obj, ref.opts, this.game)
      }
    }
  }

}

Phaser.Plugin.Behavior = BehaviorPlugin