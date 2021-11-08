class Model{
    constructor(gl,vertices, indices){
        this.vertex_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        // gl.bindBuffer(gl.ARRAY_BUFFER, null);

        this.index_Buffer = gl.createBuffer();
        gl.bindBuffer(
          gl.ELEMENT_ARRAY_BUFFER,
          this.index_Buffer
        );
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        this.indices= indices.length;
  
        console.log("indices.length " + indices.length);

    }
}

