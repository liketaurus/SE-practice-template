extends Area2D

var player_in_area = false

func _ready() -> void:
	connect("body_entered", _on_body_entered)
	connect("body_exited", _on_body_exited)
	
	$AnimationPlayer.play("idle")

func _process(delta):
	if Input.is_key_pressed(KEY_E) and player_in_area:
		$Label.visible = true

func _on_body_entered(body: Node) -> void:
	player_in_area = true

func _on_body_exited(body: Node) -> void:
	player_in_area = false
	$Label.visible = false
