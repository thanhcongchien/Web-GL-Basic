class Object {
  initialDirect = 1;
  size = 1;
  constructor(model, shader, position, scaling, rotation, color, anim) {
    this.model = model;
    this.shader = shader;
    this.position = position;
    this.scaling = scaling;
    this.rotation = rotation;
    this.modelMatrix = null;
    this.color = color;
    this.anim = anim;
    console.log("object" + this.position);
  }

  draw(gl) {
    gl.useProgram(this.shader.shaderProgram);

    /* ======== Associating shaders to buffer objects =======*/

    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, this.model.vertex_buffer);

    // Bind index buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.model.index_buffer);
    // Bind color buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.model.color_buffer);

    // Get the attribute location
    let aVertexPosition_Loc = gl.getAttribLocation(
      this.shader.shaderProgram,
      "aVertexPosition"
    );

    gl.enableVertexAttribArray(aVertexPosition_Loc);
    // point an attribute to the currently bound VBO
    gl.vertexAttribPointer(aVertexPosition_Loc, 3, gl.FLOAT, false, 0, 0);

    // Enable the attribute

    // bind the color buffer
    //  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);

    // get the location of attributes
    let uniformColor_Loc = gl.getUniformLocation(
      this.shader.shaderProgram,
      "uColor"
    );
    //Enable the attribute
    // gl.uniform3f(uniformColor_Loc,0.0,1.0,0.0);
    
    gl.uniform3f(uniformColor_Loc, this.color[0], this.color[1], this.color[2]);
    console.log("ccc" + uniformColor_Loc);
    console.log("this.modelMatrix" + this.modelMatrix);

    let modelMatrix_Loc = gl.getUniformLocation(
      this.shader.shaderProgram,
      "u_modelMatrix"
    );

    
    gl.uniformMatrix4fv(modelMatrix_Loc, false, this.modelMatrix);

    // gl.drawElements(gl.TRIANGLES,this.model.indices_length,gl.UNSIGNED_SHORT,0);
    gl.drawArrays(
      gl.TRIANGLE_STRIP,
      this.model.indices_length,
      gl.UNSIGNED_SHORT
    );
  }

  update(deltaTime) {
    let { positionParam, scalingParam, rotationParam } = this.anim;
    // let distance = 0.1;
    let speed = 0.0000001;
    let distance = positionParam * deltaTime;
    // if (this.position[1] < 1) {
    //   this.position[1] += this.position[1] + distance;
    // }
    // if (this.position[1] >= 1.5) {
    //   this.position[1] -= this.position[1] - distance;
    // }
    //rotate

    let curretInitdataDirect 
    = this.position[1] < -0.5  && this.initialDirect === -1 
    ? 1 
    : this.position[1] > 0.5 && this.initialDirect === 1 
    ? -1 
    : this.initialDirect ;

    this.initialDirect  = curretInitdataDirect;
    this.position[1] += curretInitdataDirect * distance;
    let rotation = 0.1;
    let angle_rotation = rotation * deltaTime;
    let transMatrix = MY_LIBS.translate(this.position);
    console.log("this.modelMatrix" + transMatrix);
    console.log("this.this.position" + this.position);
    this.rotation.angle += rotationParam * deltaTime;
    let rotationMatrix = MY_LIBS.rotate(
      this.rotation.angle,
      this.rotation.axis
    );
    console.log("this.rotationMatrix" + rotationMatrix);
    
    let sizeObj
    = this.scaling[0] < -0.0005
    ? 0.0005
    : this.scaling[0] > 0.0005 
    ? -0.0005
    : this.initialDirect ;
    let scaleObj = scalingParam * deltaTime;
    // this.scaling[0] += scalingParam * deltaTime;
    this.scaling[0] += sizeObj * scaleObj ;
    let scalingMatrix = MY_LIBS.scale(this.scaling);
    console.log("this.scalingMatrix" + scalingMatrix);
      
    let TR = MY_LIBS.multiplyMatrix4(
      transMatrix,
      rotationMatrix,
      scalingMatrix
    );
    console.log("this.TR" + TR);
    this.modelMatrix = MY_LIBS.multiplyMatrix4(TR, scalingMatrix);
  }
}
