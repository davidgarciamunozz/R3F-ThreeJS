import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { FirstPersonControls } from "@react-three/drei";
import { OrbitControls, GizmoHelper, GizmoViewcube, GizmoViewport} from "@react-three/drei";

// Helpers and Gizmos are utility objects that assist in visualizing or debugging
// aspects of our R3F scene. They are not meant to be used in production.
// We will try 3 of them: AxesHelper, GridHelper, and Gizmo Viewport.

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
      <axesHelper args={[10]}/>
     <meshStandardMaterial color={0x00bfff}/>
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
