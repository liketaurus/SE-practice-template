extends CharacterBody2D

var player = null
var player_in_area = false
var player_auch = false
var player_fight = false
var is_dead = 0
var speed = 100
var d = 0
@onready var animation = $AnimatedSprite2D

var timer

func _process(delta):
	_progress(delta)

	if Input.is_key_pressed(KEY_SPACE) and player_fight:
		d += 1
		if d == 1:
			is_dead = 1
			animation.play("death")
			speed = 0
		elif d > 1:
			speed = 0
	elif player_in_area:
		_move(delta)

func _init():
	timer = Timer.new()
	add_child(timer)
	timer.autostart = true
	timer.wait_time = 3.0
	timer.connect("timeout", self.timeout)

func timeout():
	if player_auch and is_dead < 1:
		Global.hp -= 1

func _progress(delta):
	if velocity == Vector2.ZERO and d < 1:
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
	
"""
func _on_death_body_entered(body):
	if body.name == "Player":
		$AnimatedSprite2D.stop()
		_death()
		
func _death():
	pass
	

func _on_animated_sprite_2d_animation_finished():
	pass
"""

func _on_auch_body_entered(body):
	if body.name == "Player":
		player_auch = true

func _on_auch_body_exited(body):
	if body.name == "Player":
		player_auch = false


func _on_death_body_entered(body):
	if body.name == "Player":
		player_fight = true

func _on_death_body_exited(body):
	if body.name == "Player":
		player_fight = false
