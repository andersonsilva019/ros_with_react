import { useEffect } from "react"
import { rosConnection } from "../lib/ros"

let createdMap = false

export function Map() {

  function viewMap(){

    if (createdMap) return

    const viewer = new (window as any).ROS2D.Viewer({
      divID: 'map',
      width: 600,
      height: 500,
      background: '#eeeeee',

    })

    const navClient = new (window as any).NAV2D.OccupancyGridClientNav({
      ros: rosConnection,
      rootObject: viewer.scene,
      serverName: '/move_base',
      viewer,
      //withOrientation: true,
    })

    createdMap = true
  } 

  useEffect(() => {
    viewMap()
  },[])

  return <div id="map"/>
  
}