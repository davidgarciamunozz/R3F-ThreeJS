import "./App.css";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewcube,
  GizmoViewport,
  useHelper,
  useGLTF
} from "@react-three/drei";
import { useControls } from "leva";
import { SpotLightHelper, DirectionalLightHelper, CameraHelper, TextureLoader} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


// To apply textures to an object, we need to make a customm component and import the TextureLoader from three.

function SphereWithTexture() {

  const texture = useLoader(TextureLoader, "/texture.jpg");
  return (
    <mesh position={[-2, 3, 2]} >
      <sphereGeometry/>
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

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
    castShadow
    />
  );
}

function DLightWithHelper() {
  const light = useRef();
  useHelper(light, DirectionalLightHelper, 2, "crimson");

  const shadow = useRef();

  useHelper(shadow, CameraHelper);
  
  return (
    <directionalLight
    ref={light}
    position={[-5, 8, 1]}
    castShadow
    >
      <orthographicCamera attach='shadow-camera' ref={shadow} top={8} right={8} />
    </directionalLight> 
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
    <mesh ref={boxRef} position={[5, 3, 0]} castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <axesHelper args={[10]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// First method

function Model(){
  const result = useLoader(GLTFLoader, "/space-ship-scaled.glb");

  return <primitive object={result.scene} position={[0,-1.5,0]} />;
}

// Second method

function SecondModel(){
  const result = useGLTF("/space-ship-scaled.glb");

  return <primitive object={result.scene} position={[0,0,0]} />;
}

function App() {
  return (
    <div id="canvas-container">
      <Canvas shadows>
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport />
        </GizmoHelper>
        <gridHelper args={[20, 20, 0xff22aa, 0x55ccff]} />
        <axesHelper args={[10]} />
        <OrbitControls />
        <AnimatedBox />
        {/* <LightWithHelper /> */}
        <DLightWithHelper />
        <mesh rotation={[-Math.PI/2, 0 , 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#f3f3f3"/>
        </mesh>
        {/* <Model /> */}
        <SphereWithTexture />
        <SecondModel />
      </Canvas>
    </div>
  );
}

export default App;
