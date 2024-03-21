extends CharacterBody2D

var player = null
var player_in_area = false
var player_auch = false
var player_fight = false
var is_dead = 0
var hp = 3
var speed = 100
var d = 0
@onready var animation = $AnimatedSprite2D

var timer
var timer2

func _process(delta):
	_progress(delta)

	if hp == 2:
		$Hp3.visible = false
	elif hp == 1:
		$Hp2.visible = false
	elif hp == 0:
		$Hp.visible = false
		is_dead = 1
		animation.play("death")
		speed = 0

	if player_in_area and is_dead == 0:
		_move(delta)

func _init():
	timer = Timer.new()
	add_child(timer)
	timer.autostart = true
	timer.wait_time = 1.5
	timer.connect("timeout", self.timeout)
	
	timer2 = Timer.new()
	add_child(timer2)
	timer2.autostart = true
	timer2.wait_time = 0.5
	timer2.connect("timeout", self.timeout2)

func timeout():
	if player_auch and is_dead < 1:
		Global.hp -= 1

func timeout2():
	if Input.is_key_pressed(KEY_SPACE) and player_fight:
		hp -= 1

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
