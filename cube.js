class Cube{
    constructor(gl,vertices_cube, indices_cube,colors){
        this.vertex_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices_cube), gl.STATIC_DRAW);
        // gl.bindBuffer(gl.ARRAY_BUFFER, null);



        // Create and store data into color buffer
        // this.color_buffer = gl.createBuffer ();
        // gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
        // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);


        this.index_Buffer = gl.createBuffer();
        gl.bindBuffer(
          gl.ELEMENT_ARRAY_BUFFER,
          this.index_Buffer
        );
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices_cube), gl.STATIC_DRAW);
        // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        this.indices_cube= indices_cube.length;
  
        console.log("indices_cube.length " + indices_cube.length);

    }
}

