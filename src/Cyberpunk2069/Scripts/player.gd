extends CharacterBody2D


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
		$Player.flip_h = true
		velocity.x = -speed
	if Input.is_key_pressed(KEY_D):
		$Player.flip_h = false
		velocity.x = speed
	
	if velocity.x == 0 and velocity.y == 0:
		$AnimationPlayer.play("idle")
	elif speed == 150:
		$AnimationPlayer.play("walk")
	else:
		$AnimationPlayer.play("run")

	move_and_slide()
