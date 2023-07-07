import { useEffect } from "react"
import { rosConnection } from "../lib/ros"

let createdMap = false

export function Map() {


  function viewMap(){

    if (createdMap) return

    const viewer = new (window as any).ROS2D.Viewer({
      divID: 'map',
      width: 600,
      height: 500
    })

    const navClient = new (window as any).NAV2D.OccupancyGridClientNav({
      ros: rosConnection,
      rootObject: viewer.scene,
      viewer,
      serverName: '/odom',
      withOrientation: true,
      topic: '/map_update',
    })

    createdMap = true
  } 

  useEffect(() => {
    viewMap()
  },[])

  return (
    <div id="map">
      map
    </div>
  )
}