extends Node2D

func _on_button_pressed():
	get_tree().change_scene_to_file("res://Scenes/menu.tscn")

func _ready():
	$CheckButton.button_pressed = Global.enable_music
	$CheckButton.connect("toggled", toggled)

func toggled(togled_on: bool):
	Global.enable_music = togled_on
