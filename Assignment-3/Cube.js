//---------------------------------------------------------------------------
//
//  --- Cube.js ---

const DefaultNumSides = 6;

//  Further, the vertex- and fragment-shader ids assume that the HTML "id" 
//    attributes for the vertex and fragment shaders are named
//
//      Vertex shader:   "Cube-vertex-shader"
//      Fragment shader: "Cube-fragment-shader"
//
function Cube( gl, numSides, vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    const vertShdr = vertexShaderId || "Cube-vertex-shader";
    const fragShdr = fragmentShaderId || "Cube-fragment-shader";

    // Initialize the object's shader program from the provided vertex
    //   and fragment shaders.  We make the shader program private to
    //   the object for simplicity's sake.
    // 
    const shaderProgram = initShaders( gl, vertShdr, fragShdr );

    if ( shaderProgram < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }
    this.positions = { numComponents : 24 };

    // Cube Vertex Data
    positions = [
        0, 0, 0, // 0
        1, 0, 0, // 1
        1, 1, 0, // 2 
        0, 1, 0, // 3
        0, 0, 1, // 4
        1, 0, 1, // 5
        1, 1, 1, // 6
        0, 1, 1  // 7
      ];
      aColor = this.positions;
      this.aColor = vec4();

      // Cube Face Data
    indices = [
        4, 6, 7, // Face 0
        4, 5, 6, 
        5, 1, 2, // Face 1
        5, 2, 6,
        1, 3, 2, // Face 2
        1, 0, 3,
        7, 2, 3, // Face 3
        7, 6, 2, 
        4, 3, 7, // Face 4
        4, 0, 3,
        0, 5, 4, // Face 5
        0, 1, 5
      ];
      // save length
      const count = indices.length;

    
    uniforms = { 
        MV : gl.getUniformLocation(shaderProgram, "MV"), 
        P : gl.getUniformLocation(shaderProgram, "P") 
      };  
      this.MV = mat4();
      this.P = mat4();
    
    // Create our vertex buffer and initialize it with our positions data
    aPosition = new Attribute(gl, shaderProgram, positions,
        "aPosition", 3, gl.FLOAT );
    indices = new Indices(gl, indices);
        
    this.render = function () {
        // Drawing with uniforms
        gl.uniformMatrix4fv(uniforms.MV, false, 
            flatten(this.MV)); 
          gl.uniformMatrix4fv(uniforms.P, false, 
            flatten(this.P));

        // Enable our shader program
        gl.useProgram( shaderProgram );

        // Activate our vertex, enabling the vertex attribute we want data
        //   to be read from, and tell WebGL how to decode that data.
        //
        aPosition.enable();

        // Likewise enable our index buffer so we can use it for rendering
        //
        indices.enable();


       // Draw the cube
        gl.drawElements( gl.TRIANGLES, count, indices.type, 0 );


        // Finally, reset our rendering state so that other objects we
        //   render don't try to use the Cone's data
        //
        aPosition.disable();
        indices.disable();
    }
};
