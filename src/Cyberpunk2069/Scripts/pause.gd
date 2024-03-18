extends Control

func _on_continued_pressed():
	get_tree().paused = false
	visible = false
	
func _on_end_pressed():
	get_tree().paused = false
	get_tree().change_scene_to_file("res://Scenes/menu.tscn")
