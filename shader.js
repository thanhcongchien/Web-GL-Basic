class Shader{


    constructor(gl,vertex_shader_source,fragment_shader_source){
        let vertex_shader = gl.createShader(gl.VERTEX_SHADER);

      // Attach vertex shader source code
      gl.shaderSource(vertex_shader, vertex_shader_source);

      // Compile the vertex shader
      gl.compileShader(vertex_shader);

      if (!gl.getShaderParameter(vertex_shader, gl.COMPILE_STATUS)) {
        alert(
          "An error occurred compiling the vertex shaders: " +
            gl.getShaderInfoLog(vertex_shader)
        );
        gl.deleteShader(vertex_shader);
      }

      let fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);

      // Attach vertex shader source code
      gl.shaderSource(fragment_shader, fragment_shader_source);

      // Compile the vertex shader
      gl.compileShader(fragment_shader);

      if (!gl.getShaderParameter(fragment_shader, gl.COMPILE_STATUS)) {
        alert(
          "An error occurred compiling the vertex shaders: " +
            gl.getShaderInfoLog(fragment_shader)
        );
        gl.deleteShader(fragment_shader);
      }

       this.shaderProgram = gl.createProgram();

      // Attach a vertex shader
      gl.attachShader(this.shaderProgram, vertex_shader);

      // Attach a fragment shader
      gl.attachShader(this.shaderProgram, fragment_shader);

      // Link both the programs
      gl.linkProgram(this.shaderProgram);

      
      
      if(!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)){
          alert("error" + gl.getShaderInfoLog(shaderProgram));
      }
    }
}