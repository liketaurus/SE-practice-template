extends Area2D

var player_in_area = false
var pupupu = 0

func _ready() -> void:
	connect("body_entered", _on_body_entered)
	connect("body_exited", _on_body_exited)
	
	$AnimationPlayer.play("idle")

func _process(delta):
	if player_in_area:
		if pupupu < 1:
			$Label2.visible = true
		else:
			$Label2.visible = false
	if Input.is_key_pressed(KEY_E) and player_in_area:
		pupupu += 1
		$AnimationPlayer.play("talk")
		if Global.keys_found < 4:
			$Label.visible = true
		if Global.keys_found == 4:
			$Label3.visible = true

func _on_body_entered(body: Node) -> void:
	player_in_area = true

func _on_body_exited(body: Node) -> void:
	$AnimationPlayer.play("idle")
	player_in_area = false
	$Label.visible = false
	$Label2.visible = false
	$Label3.visible = false
	pupupu = 0
