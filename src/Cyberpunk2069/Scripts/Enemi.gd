extends CharacterBody2D

var player = null
var player_in_area = false
var speed = 100

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


