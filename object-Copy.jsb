class Object {
	constructor(model,shader,position,scaling,rotation) {		
		this.model = model;
		this.shader = shader;
		this.position = position;
		this.scaling = scaling;
		this.rotation = rotation;
		this.modelMatrix = null;
		console.log("objectthis.position------------"+this.position);
	}
	draw(gl)
	{
		//Bind the vertex buffer object ( VBO)
		 gl.useProgram(this.shader.shaderProgram); 
		 gl.bindBuffer(gl.ARRAY_BUFFER, this.model.vertex_buffer);
		 //Bind the index buffer object (IBO)
		 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.model.index_buffer);
		 // get the location of attributes
		 var aVertexPosition_Loc = gl.getAttribLocation(this.shader.shaderProgram,'aVertexPosition');
		 ////point an attribute to the currently bound VBO
		 gl.vertexAttribPointer(aVertexPosition_Loc,3,gl.FLOAT,false,0,0);
		 //Enable the attribute
		 gl.enableVertexAttribArray(aVertexPosition_Loc);
		 // get the location of uniform color
		var uniformColor_Loc = gl.getUniformLocation(this.shader.shaderProgram, "uColor");
		// specify values of uniform variables.
		//   3f= 3float         location    ,  values: red , green, blue
		gl.uniform3f(uniformColor_Loc, 0.0, 1.0, 0.0);
		// send model Matrix to GPU
		 console.log("this.modelMatrix"+this.modelMatrix);
		var modelMatrix_Loc = gl.getUniformLocation(this.shader.shaderProgram, 'u_modelMatrix');
		gl.uniformMatrix4fv(modelMatrix_Loc,false,this.modelMatrix);
		 /*-------------- render object ---------------------------*/
		  // Draw the object
		 gl.drawElements(gl.TRIANGLES, this.model.indecies_length, gl.UNSIGNED_SHORT,0);
		 //  console.log("Complete render objects");
	}
	update()
	{
		var transMatrix = MY_LIBS.translate(this.position);
		 console.log("this.transMatrix"+transMatrix);
		var rotationMatrix = MY_LIBS.rotate(this.rotation.angle,this.rotation.axis);
		 console.log("this.rotationMatrix"+rotationMatrix);
		var scalingMatrix= MY_LIBS.scale(this.scaling);
		 console.log("this.scalingMatrix"+scalingMatrix);
		
		// ModelMatrix = transMatrix*rotationMatrix*scalingMatrix
		var TR = MY_LIBS.multiplyMatrix4(transMatrix,rotationMatrix);
		 console.log("this.TR:"+TR);
		this.modelMatrix = MY_LIBS.multiplyMatrix4(TR,scalingMatrix);
	}
}