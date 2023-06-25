import RosLib from 'roslib'
import { rosConfig } from '../config/ros'

export const rosConnection = new RosLib.Ros({
  url: `ws://${rosConfig.ROS_BRIDGE_HOST}:${rosConfig.ROS_BRIDGE_PORT}`
})