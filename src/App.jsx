import { Canvas } from "@react-three/fiber";
import "./App.css";

function App() {
  return (
    <div id="canvas-container">
      <Canvas >
          {/* We can apply 3 different transformations to the mesh, translation, rotation, and scale */}
          {/* Position : The position prop is used to move the mesh along the x, y, and z axes. */}
          {/* Rotation : The rotation prop is used to rotate the mesh around the x, y, and z axes. */}
          {/* Scale : The scale prop is used to scale the mesh along the x, y, and z axes. */}
        <mesh 
        position={[-2, 2, -1]} 
        rotation={[0, 0 , Math.PI]}
        scale={[1, 1, 1]}
        >
         <torusKnotGeometry args={[1.7, 0.3, 256, 256]} />
         <meshToonMaterial color={0x00bfff} />
         <directionalLight position={[2, 5, 1]} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
