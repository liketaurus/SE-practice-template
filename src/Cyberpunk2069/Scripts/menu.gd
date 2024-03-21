extends Node2D

func _on_play_pressed():
	Global.hp = 3
	Global.keys_found = 0
	get_tree().change_scene_to_file("res://Scenes/yep.tscn")

func _on_settings_pressed():
	get_tree().change_scene_to_file("res://Scenes/settings.tscn")
