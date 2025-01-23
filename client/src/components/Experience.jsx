import { ContactShadows, Environment, OrbitControls, useCursor } from "@react-three/drei";

import { AnimatedWoman } from "./AnimatedWoman";
import { useAtom } from "jotai";
import { charactersAtom, socket } from "./SocketManager";
import { useState } from "react";
export const Experience = () => {

  const [characters] = useAtom(charactersAtom);
  const [onFloor, setonFloor] = useState(false);
  useCursor(onFloor);

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <ContactShadows blur={2} />
      <OrbitControls />
      <mesh rotation-x={-Math.PI / 2} position-y={-0.001} onClick={(e) => socket.emit("move", [e.point.x, 0, e.point.z])}
      onPointerEnter={() => setonFloor(true)}
      onPointerLeave={() => setonFloor(false)}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {characters.map((character) => (
        <AnimatedWoman
        key={character.id}
        position={character.position}
        hairColor={character.hairColor}
        topColor={character.topColor}
        bottomColor={character.bottomColor}
        />
      ))}
    </>
  );
};
