extends Node2D


func _ready():
	Engine.max_fps = 90
	
	Global.enemy1 = $Sprites/Enemi
	Global.enemy2 = $Sprites/Enemi2
	Global.enemy3 = $Sprites/Enemi3
	
	$BackrgoundMusic.playing = Global.enable_music

func _process(delta):
	pass
