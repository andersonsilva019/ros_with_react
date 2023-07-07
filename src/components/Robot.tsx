import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { getRosTopic } from '../lib/ros'

interface RobotParams {
  x: number,
  y: number,
  orientation: number,
  linearVelocity: number,
  angularVelocity: number
}

interface SubscriberMessage {
  pose: {
    pose: {
      position: {
        x: number,
        y: number,
        z: number
      },
      orientation: {
        z: number,
      },
    },
  },
  twist: {
    twist: {
      linear: {
        x: number,
        y: number,
        z: number
      },
      angular: {
        x: number,
        y: number,
        z: number
      }
    }
  }
}

export function Robot() {

  const [robot, setRobot] = useState<RobotParams>({
    x: 0,
    y: 0,
    orientation: 0,
    linearVelocity: 0,
    angularVelocity: 0
  })

  function getRobotParams() {
    const poseSubscriber = getRosTopic('/odom', 'nav_msgs/msg/Odometry')

    poseSubscriber.subscribe((message: any) => {
      setRobot({
        x: message.pose.pose.position.x.toFixed(2),
        y: message.pose.pose.position.y.toFixed(2),
        orientation: message.pose.pose.orientation.z.toFixed(2),
        linearVelocity: message.twist.twist.linear.x.toFixed(2),
        angularVelocity: message.twist.twist.angular.z.toFixed(2)
      })
    })
  }

  useEffect(() => {
    getRobotParams()
  },[])

  return (
    <div>
      <Row>
        <Col>
          <h4 className='mt-4'>Position</h4>
          <p className='mt-0'>x: {robot.x}</p>
          <p className='mt-0'>y: {robot.y}</p>
          <p className='mt-0'>Orientation: {robot.orientation}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className='mt-4'>Velocities</h4>
          <p className='mt-0'>Linear velocity: {robot.linearVelocity}</p>
          <p className='mt-0'>Angular velocity: {robot.angularVelocity}</p>
        </Col>
      </Row>
    </div>
  )
}