import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";
import {
  getAdresses,
  getPoints,
  getSelectedAdress,
  setSelectedAdress,
} from "../../redux/reducers/adressesSlice";
import { OrderContent } from "./OrderContent";

export const OrderPanel = () => {
  const points = useSelector(getPoints);
  const adresses = useSelector(getAdresses);
  const selectedAdress = useSelector(getSelectedAdress);
  const dispatch = useDispatch();

  const columns = [
    { title: "Orders № ", dataIndex: "num", key: "num" },
    { title: "Дата", dataIndex: "createdAt", key: "createdAt" },
  ];

  return (
    <Table
      className="table"
      columns={columns}
      scroll={{
        x: true,
      }}
      expandedRowRender={(record) => (
        <OrderContent points={points} id={record.key} />
      )}
      expandable={{
        expandRowByClick: true,
      }}
      rowClassName={(record) =>
        record.key === selectedAdress.key ? "address-selected" : ""
      }
      onRow={(record) => {
        return {
          onClick: () => {
            dispatch(
              setSelectedAdress({
                key: record.key,
                num: record.num,
                createdAt: record.createdAt,
                pointA: record.pointA,
                pointB: record.pointB,
              })
            );
          },
        };
      }}
      dataSource={adresses}
      size="middle"
    />
  );
};
