import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewcube,
  GizmoViewport,
  useHelper,
} from "@react-three/drei";
import { useControls } from "leva";
import { SpotLightHelper } from "three";

// Manually changing values to test various settings can be somewhat frustrating and time consuming.
// A fantastic debbuging tool we can use is Leva, which allows us to change values in real time.
// install leva by running npm install leva (leva@0.9.34), latest version may have some issues with color picker.

// We can use spotlight helper to visualize the light source in the scene and to achieve the perfect lighting for our scene.

function LightWithHelper() {
  const light = useRef();

  const { angle, penumbra } = useControls({
    angle: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.01,
    },

    penumbra: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  useHelper(light, SpotLightHelper, "teal");

  return (
    <spotLight
      ref={light}
      angle={angle}
      penumbra={penumbra}
      intensity={80}
      position={[2, 5, 1]}
    />
  );
}

function AnimatedBox() {
  const boxRef = useRef();

  const { color, speed } = useControls({
    color: "#00bfff",
    speed: {
      value: 0.005,
      min: 0,
      max: 0.2,
      step: 0.001,
    },
  });

  useFrame(() => {
    boxRef.current.rotation.x += speed;
    boxRef.current.rotation.y += speed;
    boxRef.current.rotation.z += speed;
  });

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[2, 2, 2]} />
      <axesHelper args={[10]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport />
        </GizmoHelper>
        <gridHelper args={[20, 20, 0xff22aa, 0x55ccff]} />
        <axesHelper args={[10]} />
        <OrbitControls />
        <AnimatedBox />
        {/* <ambientLight intensity={0.2} color={0xfcfcfc} /> */}
        {/* <directionalLight
          position={[2, 5, 1]}
          intensity={0.8}
          color={0xffffff}
        /> */}
        {/* <spotLight intensity={80} position={[2, 5, 1]}  /> */}
        <LightWithHelper />

        {/* <pointLight
          intensity={50}
          position={[2, 5, 1]}
        /> */}
      </Canvas>
    </div>
  );
}

export default App;
