import { Joystick } from "react-joystick-component";
import Roslib from 'roslib'
import { createRosTopic } from "../lib/ros";
import { rosConfig } from "../config/ros";

type JoystickDirection = "FORWARD" | "RIGHT" | "LEFT" | "BACKWARD";


interface IJoystickUpdateEvent {
  type: "move" | "stop" | "start";
  x: number | null;
  y: number | null;
  direction: JoystickDirection | null;
  distance: number | null;
}

export function Teleoperation() {

  function handleMove(event: IJoystickUpdateEvent) {
    const cmdVel = createRosTopic({
      name: rosConfig.CMD_VEL_TOPIC,
      messageType: rosConfig.MESSAGE_TYPE
    })

    const twist = new Roslib.Message({
      linear: {
        x: (event.y || 0),
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: -(event.x || 0),
      }
    })

    cmdVel.publish(twist)

  }

  function handleStop(event: IJoystickUpdateEvent) {
    const cmdVel = createRosTopic({
      name: rosConfig.CMD_VEL_TOPIC,
      messageType: rosConfig.MESSAGE_TYPE
    })

    const twist = new Roslib.Message({
      linear: {
        x: 0,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: 0,
      }
    })

    cmdVel.publish(twist)
  }

  return (
    <Joystick
      size={100}
      baseColor="#EEEEEE"
      stickColor="#BBBBBB"
      move={handleMove}
      stop={handleStop}
    />
  )
}