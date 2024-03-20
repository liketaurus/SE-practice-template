extends CharacterBody2D

var player = null
var player_in_area = false
var speed = 100
@onready var animation = $AnimatedSprite2D

func _process(delta):
	_progress(delta)
	_move(delta)
	
func _progress(delta):
	if velocity == Vector2.ZERO:
		$AnimatedSprite2D.play("idle")
	elif speed == 100:
		$AnimatedSprite2D.play("run")

func _on_detector_body_entered(body):
	if body.name == "Player":
		player_in_area = true
		
func _on_detector_body_exited(body):
	if body.name == "Player":
		player_in_area = false

func _move(delta):
	if not player_in_area:
		return
	
	var player = $"../Player"
	var direction = -(self.position - player.position).normalized()
	
	velocity = direction * speed
	
	move_and_slide()
	
		
func _on_death_body_entered(body):
	if body.name == "Player":
		print(1)
		$AnimatedSprite2D.stop()
		_death()
		
func _death ():
		animation.play("death")
		await animation.animation_finished
		queue_free()
	
func _on_animated_sprite_2d_animation_finished():
	pass # Replace with function body.
