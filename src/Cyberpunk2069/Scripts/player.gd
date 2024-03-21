extends CharacterBody2D

var paused = false
var key_pressed = false
var key_in_item_aura = false
var current_key: Area2D = null
"""
var left_enemy: Area2D = null
var right_enemy: Area2D = null
"""
func _ready():
	$ItemAura.connect("area_shape_entered", area_shape_entered)
	$ItemAura.connect("area_shape_exited", area_shape_exited)
"""
	$AttackLeft.connect("area_shape_entered", atack_left_shape_entered)
	$AttackRight.connect("area_shape_entered", atack_right_shape_entered)
	
	$AttackLeft.connect("area_shape_exited", atack_left_shape_exited)
	$AttackRight.connect("area_shape_exited", atack_right_shape_exited)
"""
"""
func atack_right_shape_entered(area_rid:RID, area:Area2D, area_shape_index:int, local_shape_index:int):
	if area.name.to_lower().find("hitbox"):
		return
		
	right_enemy = area

func atack_left_shape_entered(area_rid:RID, area:Area2D, area_shape_index:int, local_shape_index:int):
	if area.name.to_lower().find("hitbox"):
		return
		
	left_enemy = area

func atack_right_shape_exited(area_rid:RID, area:Area2D, area_shape_index:int, local_shape_index:int):
	if area.name.to_lower().find("hitbox"):
		return
	
	right_enemy = null

func atack_left_shape_exited(area_rid:RID, area:Area2D, area_shape_index:int, local_shape_index:int):
	if area.name.to_lower().find("hitbox"):
		return
	
	left_enemy = null
"""
func area_shape_entered(area_rid:RID, area:Area2D, area_shape_index:int, local_shape_index:int):
	if not area.name.to_lower().find("key"):
		on_key_in_item_area(area)

func on_key_in_item_area(area: Area2D):
	if not area.visible:
		return
	
	key_in_item_aura = true
	current_key = area

func area_shape_exited(area: Area2D):
	if not area.visible:
		return
	
	key_in_item_aura = false
	current_key = area

func _process(delta):
	velocity = Vector2.ZERO
	
	var speed = 150
	
	if Input.is_key_pressed(KEY_SHIFT):
		speed += 200
	
	if Input.is_key_pressed(KEY_W):
		velocity.y = -speed
	if Input.is_key_pressed(KEY_S):
		velocity.y = speed
	if Input.is_key_pressed(KEY_A):
		$AnimatedSprite2D.flip_h = true
		velocity.x = -speed
	if Input.is_key_pressed(KEY_D):
		$AnimatedSprite2D.flip_h = false
		velocity.x = speed
		
	if Input.is_key_pressed(KEY_SPACE):
		$AnimatedSprite2D.play("attack")
	elif velocity.x == 0 and velocity.y == 0:
		$AnimatedSprite2D.play("idle")
	elif speed == 150:
		$AnimatedSprite2D.play("walk")
	else:
		$AnimatedSprite2D.play("run")
		
	move_and_slide()
	
	if Global.hp == 2:
		$CanvasLayer/Hp3.visible = false
	elif Global.hp == 1:
		$CanvasLayer/Hp2.visible = false
	elif Global.hp == 0:
		$CanvasLayer/Hp.visible = false
		Engine.time_scale = 0
		$DeadMenu.visible = true

func _unhandled_input(event):
	if event is InputEventKey and event.pressed and not event.echo:
		on_keydown(event)

func on_keydown(key):
	if key.keycode == KEY_ESCAPE:
		pause()
	if key.keycode == KEY_E:
		pickup_key()

func pickup_key():
	if not key_in_item_aura or not current_key.visible:
		return
	
	Global.keys_found += 1
	current_key.visible = false
	$CanvasLayer/CardsCounter.text = "Карт знайдено %d/4" % Global.keys_found
"""
func atack():
	if $AnimatedSprite2D.flip_h and right_enemy != null:
		right_enemy.position = Vector2(10000, 10000)
		print(right_enemy)
	if not $AnimatedSprite2D.flip_h and left_enemy != null:
		left_enemy.position = Vector2(10000, 10000)
		print(left_enemy)
"""
func pause():
	if paused:
		$Pause.hide()
		Engine.time_scale = 1
	else:
		$Pause.show()
		Engine.time_scale = 0

	paused = false
