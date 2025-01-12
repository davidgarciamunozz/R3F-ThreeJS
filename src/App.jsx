import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls, useHelper } from "@react-three/drei";
import { SpotLightHelper, GridHelper } from "three";
import { useControls } from "leva";
import "./App.css";

function AnimatedBox() {
  const boxRef = useRef();

  const { speed, color } = useControls({
    color: {
      value: "#ff00f9",
    },
    speed: {
      value: 0.005,
      min: 0,
      max: 0.03,
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
      <axesHelper args={[20]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function LigthWithHelper() {
  const light = useRef();

  const { angle, penumbra } = useControls({
    angle: Math.PI / 6,
    penumbra: {
      value: 0.0,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  useHelper(light, SpotLightHelper, "orange");

  return (
    <spotLight
      ref={light}
      angle={angle}
      penumbra={penumbra}
      color={0xffea00}
      position={[2, 5, 1]}
      intensity={80}
    />
  );
}

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <OrbitControls />
        <AnimatedBox />
        {/* <SpotLight
        position={[2, 5, 1]}
        intensity={80}
        penumbra={1}
        angle={Math.PI / 6}
        castShadow
        /> */}
        {/* <directionalLight 
        position={[2, 5, 1]}
        intensity={0.8}
        color={0xffea00}
         /> */}
        {/* <ambientLight intensity={0.2} color={0xfcfcfc} /> */}
        {/* <LigthWithHelper /> */}

        <pointLight
          position={[2, 5, 1]}
          intensity={50}
        />

        <gridHelper args={[20, 20]} />
      </Canvas>
    </div>
  );
}

export default App;
