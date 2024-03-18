extends CharacterBody2D

var paused = false

func _process(delta):
	velocity.x = 0
	velocity.y = 0
	var speed = 150
	
	if Input.is_key_pressed(KEY_SHIFT):
		speed += 200
	
	if Input.is_key_pressed(KEY_W):
		velocity.y = -speed
	if Input.is_key_pressed(KEY_S):
		velocity.y = speed
	if Input.is_key_pressed(KEY_A):
		velocity.x = -speed
	if Input.is_key_pressed(KEY_D):
		velocity.x = speed
	
	if velocity.x == 0 and velocity.y == 0:
		$AnimationPlayer.play("idle")
	elif speed == 150:
		$AnimationPlayer.play("walk")
	else:
		$AnimationPlayer.play("run")
	if Input.is_key_pressed(KEY_D):
		$Player.flip_h = false
	if Input.is_key_pressed(KEY_A):
		$Player.flip_h = true

	move_and_slide()

	if Input.is_action_pressed("pause"):
		pause()

func pause():
	if paused:
		$Pause.hide()
		Engine.time_scale = 1
	else:
		$Pause.show()
		Engine.time_scale = 0

	paused = !paused
