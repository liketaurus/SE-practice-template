extends CharacterBody2D

var paused = false
var key_pressed = false

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

func _unhandled_input(event):
	if event is InputEventKey and event.pressed and not event.echo:
		on_keydown(event)

func on_keydown(key):
	if key.keycode == KEY_ESCAPE:
		pause()

func pause():
	if paused:
		$Pause.hide()
		Engine.time_scale = 1
	else:
		$Pause.show()
		Engine.time_scale = 0

	paused = false
