extends Area2D

func _process(delta):
	if Input.is_key_pressed(KEY_E):
		$Label.visible = true
