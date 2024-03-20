extends CharacterBody2D

var chase = false
var speed = 100

func _process(delta):
	_progress(delta)
	_move(delta)

func _progress(delta):
	if velocity.x == 0 and velocity.y == 0:
		$AnimatedSprite2D.play("idle")
	elif speed == 100:
		$AnimatedSprite2D.play("run")

func _on_detector_body_entered(body):
	if body.name == "Player":
		chase = true
		print(1)

func _move(delta):
	var player = $"../Player"
	var direction = (player.position - self.position).normalized()
	if chase == true:
		velocity.x = direction.x * speed
		velocity.y = direction.y * speed
		
		print(2)
		move_and_slide()
	else:
		velocity.x = 0
	



func _on_detector_body_exited(body):
	if body.name == "Player":
		chase = false
		print(3)
