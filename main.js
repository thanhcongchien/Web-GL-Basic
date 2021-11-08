let main = function () {
  let canvas = document.getElementById("my_canvas");
  let gl = canvas.getContext("experimental-webgl");

  if (gl == null) {
    alert("unenable to intialize webgl");
    return;
  }

  let vertices = [-0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0];
  let indices = [0, 1, 2];
  let indices_square = [3, 2, 1, 3, 1, 0];
  let vertices_square = [
    -0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0, -0.5, 0.5,
    0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0,
  ];

  indices = [3, 2, 1, 3, 1, 0];

  // cube
 let vertices_cube = [
  -1,-1,-1, 1,-1,-1, 1, 1,-1, -1, 1,-1,
  -1,-1, 1, 1,-1, 1, 1, 1, 1, -1, 1, 1,
  -1,-1,-1, -1, 1,-1, -1, 1, 1, -1,-1, 1,
  1,-1,-1, 1, 1,-1, 1, 1, 1, 1,-1, 1,
  -1,-1,-1, -1,-1, 1, 1,-1, 1, 1,-1,-1,
  -1, 1,-1, -1, 1, 1, 1, 1, 1, 1, 1,-1, 
 ]

 let indices_cube = [
  0,1,2, 0,2,3, 4,5,6, 4,6,7,
  8,9,10, 8,10,11, 12,13,14, 12,14,15,
  16,17,18, 16,18,19, 20,21,22, 20,22,23 
];

let colors = [
  5,3,7, 5,3,7, 5,3,7, 5,3,7,
  1,1,3, 1,1,3, 1,1,3, 1,1,3,
  0,0,1, 0,0,1, 0,0,1, 0,0,1,
  1,0,0, 1,0,0, 1,0,0, 1,0,0,
  1,1,0, 1,1,0, 1,1,0, 1,1,0,
  0,1,0, 0,1,0, 0,1,0, 0,1,0
];


  let triangle_model = new Model(gl, vertices, indices);
  let square_model = new Square(gl, vertices_square, indices_square);
  let cuble_model = new Cube(gl, vertices_cube,indices_cube);

  let vertex_shader_source = document.getElementById("vertex-shader").innerHTML;
  let fragment_shader_source =
    document.getElementById("fragment-shader").innerHTML;
  let triangle_shader = new Shader(
    gl,
    vertex_shader_source,
    fragment_shader_source
  );
  let triangle_shader1 = new Shader(
    gl,
    vertex_shader_source,
    fragment_shader_source
  );
  let triangle_shader2 = new Shader(
    gl,
    vertex_shader_source,
    fragment_shader_source
  );
  let square_shader = new Shader(
    gl,
    vertex_shader_source,
    fragment_shader_source
  );
  let cube_shader = new Shader(gl,
    vertex_shader_source,
    fragment_shader_source);

    let square_shader1 = new Shader(gl,
    vertex_shader_source,
    fragment_shader_source);

  number_object = 6;
  let object_data = [
    {
      model: triangle_model,
      shader: triangle_shader,
      position: [-0.6, 0.2, 0.0],
      scaling: [0.5, 0.5, 0.5],
      rotation: { angle: 0, axis: "Oz" },
      color: [1.0, 0.0, 0.0, 1.0],
      anim: {positionParam: 0, scalingParam: 0, rotationParam: 8}
    },
    {
      model: triangle_model,
      shader: triangle_shader1,
      position: [0.5, 0.2, 0.0],
      scaling: [0.5, 0.5, 0.5],
      rotation: { angle: 0, axis: "Oz" },
      color: [0.0, 0.0, 0.5, 1.0],
      anim: {positionParam: 0, scalingParam: 0, rotationParam: 0}
    },
    {
      model: triangle_model,
      shader: triangle_shader2,
      position: [0, 0.2, 0.0],
      scaling: [0.5, 0.5, 0.5],
      rotation: { angle: 90, axis: "Oz" },
      color: [0.0, 0.0, 0.5, 1.0],
      anim: {positionParam: 0, scalingParam: 0, rotationParam: 0}
    },
    {
      model: square_model,
      shader: square_shader,
      position: [-0.6, -0.3, 0.0],
      scaling: [0.005, 1, 0.05],
      rotation: { angle: 0, axis: "Oz" },
      color: [1.0, 0.1, 0.5, 1.0],
      anim: {positionParam: 0, scalingParam: 0, rotationParam:0}
    },
    {
      model: square_model,
      shader: square_shader1,
      position: [0.25, -0.3, 0.0],
      scaling: [0.6, 0.5, 0.5],
      rotation: { angle: 0, axis: "Oz" },
      color: [1.0, 0.1, 0.5, 1.0],
      anim: {positionParam: 0, scalingParam: 0, rotationParam:0}
    },
    {
      model: cuble_model,
      shader: cube_shader,
      position: [0.2, 0.7, 0.0],
      scaling: [0.1, 0.1, 0.1],
      rotation: { angle: 0, axis: "Oz" },
      color: [0.4, 0.3, 0.1, 0.05],
      anim: {positionParam: 0, scalingParam: 0.0005, rotationParam: 0.05}
    }
  ];

  let scene = new Scene(number_object, object_data);

  let lastTime = new Date().getTime();
  let deltaTime = 0;
  let fps = 0;


  
  let animation_frame = function () {
    let currentTime = new Date().getTime();
    deltaTime = currentTime - lastTime;
    console.log("deltaTime" + deltaTime);
    lastTime = currentTime;
    fps = 1000 / deltaTime;
    console.log("fps" + fps);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);

    scene.update(deltaTime);
    scene.draw(gl);
    requestAnimationFrame(animation_frame);
  };
  //   setInterval(animation_frame,1000);
  // animation_frame();

  requestAnimationFrame(animation_frame);
};
