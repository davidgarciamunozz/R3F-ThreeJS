import { Canvas } from "@react-three/fiber";
import "./App.css";

function App() {
  return (
    <div id="canvas-container">
      <Canvas camera={{position:[2, 2, 2]}}>
        <mesh>
          {/* args of diffrent geometries are passed as an array. ' args={['radius', '# of width segments', '# of height segments']} ' */}
          {/* <sphereGeometry args={[1,80,80]}/> */}


          {/* REF offers a lot of geometries like sphere, box, plane, torus, etc. */}

          {/* The args of the box are passed as an array. ' args={['width', 'height', 'depth']} ' */}
          <boxGeometry args={[1,1,1]}/>

          {/* Some materials require light to be visible. For example, meshPhongMaterial, MeshPhysicalMaterial, etc. */}
          {/* <meshBasicMaterial color='gold'/> */}
          <meshPhongMaterial color='gold'/>
          <directionalLight position={[2, 5, 0]} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
