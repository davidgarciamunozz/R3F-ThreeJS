import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { FirstPersonControls } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";

// for camera controls we need to install the following package '@react-three/drei'
// wich is a collection of useful helpers and abstractions for react-three-fiber

function AnimatedBox() {
  const boxRef = useRef();

  useFrame(() => {
    boxRef.current.rotation.x += 0.005;
    boxRef.current.rotation.y += 0.005;
    boxRef.current.rotation.z += 0.005;
  }
  );

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[2, 2, 2]}/>
     <meshStandardMaterial color={0x00bfff} />
    </mesh>
  )
}

// FirstPersonControls is a component that allows us to move the camera like a first person game
// movementSpeed is the speed of the camera
// other props are available like lookSpeed, lookVertical, enabled, heightCoef, heightMin, heightMax, width, autoForward, etc

// OrbitControls is a component that allows us to move the camera like a third person game
// other props are available like enableZoom, enablePan, enableDamping, dampingFactor, enableRotate, rotateSpeed, zoomSpeed, panSpeed, etc

function App() {
  return (
    <div id="canvas-container">
      <Canvas >
        {/* <FirstPersonControls movementSpeed={2} /> */}
        <OrbitControls />
         <AnimatedBox/>
         <directionalLight position={[2, 5, 1]} />
      </Canvas>
    </div>
  );
}

export default App;
