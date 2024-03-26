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


func _on_button_pressed():
	OS.shell_open("https://sites.google.com/polytechnic.co.cc/main/%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BD%D0%B0/%D1%81%D0%BF%D0%B5%D1%86%D1%96%D0%B0%D0%BB%D1%96%D0%B7%D0%B0%D1%86%D1%96%D1%97?authuser=0#h.ho48gail8chq")
	
