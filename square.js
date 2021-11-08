class Square{
    constructor(gl,vertices_square, indices_square){
        this.vertex_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices_square), gl.STATIC_DRAW);
        // gl.bindBuffer(gl.ARRAY_BUFFER, null);

        this.index_Buffer = gl.createBuffer();
        gl.bindBuffer(
          gl.ELEMENT_ARRAY_BUFFER,
          this.index_Buffer
        );
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices_square), gl.STATIC_DRAW);
        // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        this.indices_square= indices_square.length;
  
        console.log("indices_square.length " + indices_square.length);

    }
}

