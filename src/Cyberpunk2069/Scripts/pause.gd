extends Control

func _on_continued_pressed():
	Engine.time_scale = 1
	visible = false
	
func _on_end_pressed():
	Engine.time_scale = 1
	get_tree().change_scene_to_file("res://Scenes/menu.tscn")
