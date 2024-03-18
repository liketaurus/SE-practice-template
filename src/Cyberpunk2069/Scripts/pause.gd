extends Node2D

# Called when the node enters the scene tree for the first time.
func _on_continued_pressed():
	get_tree().paused = false
	visible = false
	
func _on_end_pressed():
	get_tree().paused = false
	get_tree().change_scene_to_file("res://Scenes/menu.tscn")

