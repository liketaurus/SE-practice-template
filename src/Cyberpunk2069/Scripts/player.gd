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
		velocity.x = -speed
	if Input.is_key_pressed(KEY_D):
		velocity.x = speed
	
	if velocity.x == 0 and velocity.y == 0:
		$AnimationPlayer.play("idle")
	elif speed == 150:
		$AnimationPlayer.play("walk")
	else:
		$AnimationPlayer.play("run")

	move_and_slide()

	if Input.is_action_pressed("pause"):
		get_tree().paused = true
		$Pause.visible = true
		
