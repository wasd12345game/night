enum ActionKind {
    Walking,
    Idle,
    Jumping,
    WalkLeft,
    WalkRight
}
namespace SpriteKind {
    export const Table = SpriteKind.create()
}
sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    animation.runImageAnimation(
    sprite,
    assets.animation`ghostMove`,
    500,
    true
    )
    multilights.addLightSource(sprite, 4)
    CollisionHandler.handleSolidCollision(sprite, SpriteKind.Table)
    tiles.placeOnRandomTile(sprite, assets.tile`SpectreSpawner`)
    sprite.setVelocity(randint(-10, 10), randint(-10, 10))
})
function createWalkLeftRightAnims () {
    walkLeftAnim = animation.createAnimation(ActionKind.Walking, 250)
    walkLeftAnim.addAnimationFrame(assets.image`animLeftGirl1`)
    walkLeftAnim.addAnimationFrame(assets.image`animLeftGirl2`)
    animation.attachAnimation(mySprite, walkLeftAnim)
    walkRightAnim = animation.createAnimation(ActionKind.Walking, 250)
    walkRightAnim.addAnimationFrame(assets.image`animRightGirl1`)
    walkRightAnim.addAnimationFrame(assets.image`animRightGirl2`)
    animation.attachAnimation(mySprite, walkRightAnim)
}
controller.B.onEvent(ControllerButtonEvent.Repeated, function () {
    if (gotFlashlight == true) {
        flashlight.direction += -1
    }
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    if (gotFlashlight == true) {
        flashlight.direction += 1
    }
})
function textPrint (text: string) {
    story.printCharacterText(text, "Girl")
    index += 1
}
sprites.onOverlap(SpriteKind.Table, SpriteKind.Player, function (sprite, otherSprite) {
    if (!(gotFlashlight) && controller.A.isPressed()) {
        multilights.addFlashLightSource(
        otherSprite,
        0,
        240,
        60
        )
        textPrint("Ooh, a flashlight! Very useful.")
        flashlight = multilights.flashlightSourceAttachedTo(otherSprite)
        gotFlashlight = true
    }
})
let myEnemy: Sprite = null
let index = 0
let flashlight: lightsource.FlashlightLightSource = null
let walkRightAnim: animation.Animation = null
let walkLeftAnim: animation.Animation = null
let gotFlashlight = false
let mySprite: Sprite = null
story.setSoundEnabled(true)
textPrint("Where am I?")
textPrint("What is this place?")
textPrint("I'm worried that my parents won't come back...")
textPrint("At least I have a lantern...")
multilights.toggleLighting(true)
tiles.setCurrentTilemap(tilemap`house`)
lantern.setBreathingEnabled(true)
mySprite = sprites.create(assets.image`girl1`, SpriteKind.Player)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
multilights.addLightSource(mySprite, 10)
lantern.startLanternEffect(mySprite)
createWalkLeftRightAnims()
gotFlashlight = false
let myTable = sprites.create(assets.image`table`, SpriteKind.Table)
tiles.placeOnTile(myTable, tiles.getTileLocation(12, 4))
let statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, 0, 0)
game.onUpdateInterval(randint(10000, 60000), function () {
    myEnemy = sprites.create(assets.image`spectre`, SpriteKind.Enemy)
})
forever(function () {
    if (controller.left.isPressed()) {
        animation.setAction(mySprite, ActionKind.Walking)
    }
    if (controller.right.isPressed()) {
        animation.setAction(mySprite, ActionKind.Walking)
    }
    if (!(controller.left.isPressed() || controller.right.isPressed())) {
        animation.stopAnimation(animation.AnimationTypes.ImageAnimation, mySprite)
        mySprite.setImage(assets.image`girl1`)
    }
})
