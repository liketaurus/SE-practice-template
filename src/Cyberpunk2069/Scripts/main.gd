extends Node2D

func _ready():
	Engine.max_fps = 90

var paused = false

func _process(delta):
	if Input.is_action_pressed("pause"):
		pause()

func pause():
	if paused:
		$Pause.hide()
		get_tree().paused = false
	else:
		get_tree().paused = true
		$Pause.show()
