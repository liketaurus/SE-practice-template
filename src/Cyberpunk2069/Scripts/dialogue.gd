extends Area2D

var chase = false

func _process(body):
	if body.name == "Player":
		chase = true
		print(1)
