import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "antd";
import {
  getAdresses,
  getPoints,
  setSelectedAdress,
  updatePointsAdresses,
} from "../../redux/reducers/adressesSlice";

export const PointList = ({ id, a_to_b }) => {
  const adresses = useSelector(getAdresses);
  const points = useSelector(getPoints);

  const dispatch = useDispatch();

  const [point, setPoint] = useState();
  const [selectedPoint, setSelectedPoint] = useState(0);

  const { Option } = Select;

  const selectClassName = `points-list-${a_to_b ? "a" : "b"}-${id}`;

  useEffect(() => {
    adresses.map((adress) => {
      if (adress.key === id) {
        setPoint(a_to_b ? adress.pointA : adress.pointB);
        setSelectedPoint(a_to_b ? adress.pointA.id : adress.pointB.id);
      }
      return adress;
    }); // eslint-disable-next-line
  }, [point, selectedPoint]);

  return (
    <span>
      <Select
        className={selectClassName}
        style={{ display: "block" }}
        value={selectedPoint}
        onChange={(value) => {
          let newPoint;
          let savedPoint;

          points.find((item) => {
            if (item.id === value) {
              return (newPoint = item);
            }
            return newPoint;
          });

          adresses.find((adress) => {
            if (adress.key === id) {
              return (savedPoint = a_to_b ? adress.pointB : adress.pointA);
            }
            return savedPoint;
          });

          setSelectedPoint(value);
          setPoint(newPoint);

          dispatch(
            setSelectedAdress({
              key: id,
              num: "",
              createdAt: "",
              pointA: a_to_b ? newPoint : savedPoint,
              pointB: !a_to_b ? newPoint : savedPoint,
            })
          );

          dispatch(
            updatePointsAdresses({
              key: id,
              num: "",
              createdAt: "",
              pointA: a_to_b ? newPoint : savedPoint,
              pointB: !a_to_b ? newPoint : savedPoint,
            })
          );
        }}
      >
        {points.map((item) => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    </span>
  );
};
