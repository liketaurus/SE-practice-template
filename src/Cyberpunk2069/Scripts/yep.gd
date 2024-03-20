extends Node2D


func _ready():
	Engine.max_fps = 90


func _process(delta):
	print(Global.keys_found)
	pass
