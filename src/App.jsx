import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls, GizmoHelper, GizmoViewcube, GizmoViewport} from "@react-three/drei";
import { useControls } from "leva";

// Manually changing values to test various settings can be somewhat frustrating and time consuming.
// A fantastic debbuging tool we can use is Leva, which allows us to change values in real time.
// install leva by running npm install leva (leva@0.9.34), latest version may have some issues with color picker.


function AnimatedBox() {
  const boxRef = useRef();

  const {color, speed} = useControls({
    color : '#00bfff',
    speed: {
      value: 0.005,
      min: 0,
      max: 0.2,
      step: 0.001,
    }
  }
  );

  useFrame(() => {
    boxRef.current.rotation.x += speed;
    boxRef.current.rotation.y += speed;
    boxRef.current.rotation.z += speed;
  }
  );

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[2, 2, 2]}/>
      <axesHelper args={[10]}/>
     <meshStandardMaterial color={color}/>
    </mesh>
  )
}

function App() {
  return (
    <div id="canvas-container">
      <Canvas >
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport />
          <GizmoViewcube />
        </GizmoHelper>
        <gridHelper args={[20,20, 0xff22aa, 0x55ccff]}/>
        <axesHelper args={[10]}/>
        <OrbitControls />
         <AnimatedBox/>
         <directionalLight position={[2, 5, 1]} />
      </Canvas>
    </div>
  );
}

export default App;
