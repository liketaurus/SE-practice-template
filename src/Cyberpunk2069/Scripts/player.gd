extends CharacterBody2D

func _physics_process(delta):
	var x_dir = Input.get_axis("move_left", "move_right")
	velocity.x = 150 * x_dir
	var y_dir = Input.get_axis("move_up", "move_down")
	velocity.y = 150 * y_dir

	move_and_slide()


func _process(delta):
	var x_dir = Input.get_axis("run_left", "run_right")
	velocity.x = 175 * x_dir
	var y_dir = Input.get_axis("run_up", "run_down")
	velocity.y = 175 * y_dir

	move_and_slide()
