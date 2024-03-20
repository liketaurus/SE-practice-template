extends Area2D
var keys_found = 0 
var player_in_area = false

func _ready() -> void:
	connect("body_entered", _on_body_entered)
	connect("body_exited", _on_body_exited)

func _unhandled_input(event):
	if event is InputEventKey and event.pressed and not event.echo:
		on_keydown(event)

func on_keydown(key):
	if key.keycode == KEY_E and player_in_area:
		keys_found += 1
		$Label.visible = false
		$CanvasLayer/key1.text = "Ключів знайдено %d/4" % keys_found

func _process(delta):
	if Input.is_key_pressed(KEY_E) and player_in_area:
		pass

func _on_body_entered(body: Node) -> void:
	player_in_area = true

func _on_body_exited(body: Node) -> void:
	player_in_area = false
