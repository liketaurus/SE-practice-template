extends CharacterBody2D

var paused = false
var key_pressed = false
var keys_found = 0
var key_in_item_aura = false
var current_key: Area2D = null

func _ready():	
	$ItemAura.connect("area_shape_entered", area_shape_entered)
	$ItemAura.connect("area_shape_exited", area_shape_exited)

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

func _unhandled_input(event):
	if event is InputEventKey and event.pressed and not event.echo:
		on_keydown(event)

func on_keydown(key):
	if key.keycode == KEY_ESCAPE:
		pause()
	if key.keycode == KEY_E:
		pickup_key()

func pickup_key():
	print(key_in_item_aura)
	if not key_in_item_aura or not current_key.visible:
		return
	
	keys_found += 1
	current_key.visible = false
	$CanvasLayer/CardsCounter.text = "Карт знайдено %d/4" % keys_found

func pause():
	if paused:
		$Pause.hide()
		Engine.time_scale = 1
	else:
		$Pause.show()
		Engine.time_scale = 0

	paused = false
	

