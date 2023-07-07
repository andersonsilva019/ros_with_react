import RosLib from 'roslib'
import { rosConfig } from '../config/ros'

interface ICreateRosTopic {
  name: string
  messageType: string
}

export const rosConnection = new RosLib.Ros({
  url: `ws://${rosConfig.ROS_BRIDGE_HOST}:${rosConfig.ROS_BRIDGE_PORT}`
})

export const createRosTopic = ({ name, messageType }: ICreateRosTopic) => {
  return new RosLib.Topic({
    ros: rosConnection,
    name,
    messageType
  })
}

export const getRosTopic = (name: string, messageType: string) => {
  return new RosLib.Topic({
    ros: rosConnection,
    name,
    messageType
  })
}