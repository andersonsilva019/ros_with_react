import { Row, Col, Container, Button } from 'react-bootstrap'
import { RosConnection } from "./RosConnection";
import { Teleoperation } from "./Teleoperation";
import { Robot } from './Robot';
import { Map } from './Map';
import Webcam from "react-webcam";
import { useCallback, useEffect, useState } from 'react';

export function Main() {

  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);

  console.log(devices);

  const handleDevices = useCallback((mediaDevices: any) =>
    setDevices(mediaDevices.filter(({ kind }: { kind: any }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(
    () => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    },
    [handleDevices]
  );


  return (
    <main>
      <Container>
        <Row>
          <Col>
            <RosConnection />
          </Col>
        </Row>
        <Row>
          <Col>
            <Teleoperation />
          </Col>
        </Row>
        <Row>
          <Col>
            <Robot />
          </Col>
          <Col>
            <Map />
          </Col>
        </Row>
        <Row>
          <Col>
            <Webcam 
              audio={false}
              videoConstraints={{ deviceId: 'e2a773e914adb9b9edfd37e8d35fd3472a65a737b402f5c8a027e3f8097c6168' }}
            />
          </Col>
        </Row>
      </Container>
    </main>
  )
}