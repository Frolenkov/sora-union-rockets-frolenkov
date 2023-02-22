import { Col, Row, Typography } from "antd";

import RocketCard from "../RocketCard";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { IRocket } from "@/models";
import { getFromStorage } from "@/utils/helpers";
import { useEffect } from "react";
import { addRocket, addRocketsArray } from "@/store/rocket/rocketSlice";

const rocketSelector = (store: {
  rocket: {
    rocketsList: IRocket[],
  }
}) => store.rocket;

const RocketList = () => {

  const { rocketsList } = useAppSelector(rocketSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Array.isArray(getFromStorage<IRocket[]>("rockets"))) {
      dispatch(addRocketsArray(getFromStorage<IRocket[]>("rockets")))
    }
  }, [dispatch])

  const { Title } = Typography;

  return (
    <Col
      span={6}
      style={{
        minWidth: "50%"
      }}
    >
      <Title level={2}>Rockets</Title>
      <Row
        style={{
          flexDirection: "column-reverse",
          padding: "15px"
        }}
        gutter={[0, 24]}
      >
        {rocketsList.map((rocket) => (
          <RocketCard
            key={rocket.id}
            rocket={rocket}
          />
        ))}
      </Row>
    </Col>
  );
};

export default RocketList;
