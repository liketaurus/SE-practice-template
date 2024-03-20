extends Area2D


var player_in_area = false


func _ready() -> void:
	connect("body_entered", _on_body_entered)
	connect("body_exited", _on_body_exited)
	
	$AnimationPlayer.play("idle")

func _process(delta):
	if player_in_area:
		$Label2.visible = true
	if Input.is_key_pressed(KEY_E) and player_in_area:
		$AnimationPlayer.play("talk")
		$Label.visible = true

func _on_body_entered(body: Node) -> void:
	player_in_area = true

func _on_body_exited(body: Node) -> void:
	$AnimationPlayer.play("idle")
	player_in_area = false
	$Label.visible = false
	$Label2.visible = false
	


var paused = false
var key_pressed = false
var keys_found = 0
var key_in_item_aura = false
var current_key: Area2D = null


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
	print(keys_found)

func pause():
	if paused:
		$Pause.hide()
		Engine.time_scale = 1
	else:
		$Pause.show()
		Engine.time_scale = 0

	paused = false
	

