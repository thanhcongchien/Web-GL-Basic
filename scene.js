class Scene {
  constructor(number_objects, object_data) {
    this.number_objects = number_objects;
    this.object_list = [];
    for (let i = 0; i < this.number_objects; i++) {
      // console.log("oject data[i]" + object_data[i].model);
      this.object_list[i] = new Object(
        object_data[i].model,
        object_data[i].shader,
        object_data[i].position,
        object_data[i].scaling,
        object_data[i].rotation,
        object_data[i].color,
        object_data[i].anim
      );
    }
  }

  update(deltaTime) {
    for (let i = 0; i < this.number_objects; i++) {
      this.object_list[i].update(deltaTime);
    }
  }

  draw(gl) {
    for (let i = 0; i < this.number_objects; i++) {
      this.object_list[i].draw(gl);
    }
  }
}
