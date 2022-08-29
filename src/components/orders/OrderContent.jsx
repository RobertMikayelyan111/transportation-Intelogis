import { Table } from "antd";
import { PointList } from "./PointList";

export const OrderContent = ({ points, id }) => {
  const columns = [
    {
      title: "Адрес погрузки",
      dataIndex: "pointsA",
      key: id,
      render: () => <PointList id={id} a_to_b={true} />,
    },

    {
      title: "Адрес разгрузки",
      dataIndex: "pointsB",
      key: id,
      render: () => <PointList id={id} a_to_b={false} />,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={[
        {
          pointsA: points,
          pointsB: points,
        },
      ]}
      pagination={false}
    />
  );
};
