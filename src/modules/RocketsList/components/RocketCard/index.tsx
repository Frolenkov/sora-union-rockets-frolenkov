import { Card, Row, Typography } from "antd";
import { IRocket } from "@/models";
import { DeleteOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/hooks/redux";
import { removeRocket, updateRocket } from "@/store/rocket/rocketSlice";

const { Title, Text } = Typography;

const RocketCard = ({ rocket }: { rocket: IRocket }) => {
  const dispatch = useAppDispatch();

  return (
    <Card
      title={rocket.title}
      style={{
        width: "100%",
        marginBottom: "15px"
      }}
      extra={
          <DeleteOutlined
            onClick={() => {
              dispatch(removeRocket(rocket.id));
            }}
            style={{
              cursor: "pointer",
            }}
          />
      }
    >
      <Row
        style={{
          marginBottom: 12,
        }}
      >
      <Text
          style={{
            width: "100%",
            fontSize: 18,
          }}
        >
          Title
        </Text>
        <Text
          style={{
            fontSize: 18,
          }}
          editable={{
            triggerType: ["text"],
            tooltip: "click to edit",
            onChange: (title) => {
              dispatch(updateRocket({ ...rocket, title }));
            },
          }}
        >
          {rocket.title}
        </Text>
      </Row>
      <Row
        style={{
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            width: "100%",
            fontSize: 18,
          }}
        >
          Name
        </Text>
        <Text
          style={{
            fontSize: 18,
          }}
          editable={{
            triggerType: ["text"],
            tooltip: "click to edit",
            onChange: (rocketName) => {
              dispatch(updateRocket({ ...rocket, rocketName }));
            },
          }}
        >
          {rocket.rocketName}
        </Text>
      </Row>
      <Row
        style={{
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            width: "100%",
            fontSize: 18,
          }}
        >
          Description
        </Text>
        <Text
          style={{
            fontSize: 18,
          }}
          editable={{
            triggerType: ["text"],
            tooltip: "click to edit ",
            onChange: (description) => {
              dispatch(updateRocket({ ...rocket, description }));
            },
          }}
        >
          {rocket.description}
        </Text>
      </Row>
      <Row
        style={{
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            width: "100%",
            fontSize: 18,
          }}
        >
          User
        </Text>
        <Text
          style={{
            fontSize: 18,
          }}
          editable={{
            triggerType: ["text"],
            tooltip: "click to edit ",
            onChange: (description) => {
              dispatch(updateRocket({ ...rocket, description }));
            },
          }}
        >
          {rocket.username}
        </Text>
      </Row>
    </Card>
  );
};

export default RocketCard;
