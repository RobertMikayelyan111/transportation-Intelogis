import { createSlice, current } from "@reduxjs/toolkit";
import { adresses } from "../../dataBase/adresses";
import { points } from "../../dataBase/points";

const initialState = {
  adresses: adresses,

  selected: {
    key: 0,
    num: "",
    createdAt: "",
    pointA: {},
    pointB: {},
  },

  points: {
    pointsA: points,
    pointsB: points,
    points: points,
  },
};

export const adressesSlice = createSlice({
  name: "adresses",
  initialState,
  reducers: {
    setAdresses: (state, action) => {
      state.adresses = action.payload;
    },

    updatePointsAdresses: (state, action) => {
      const { key, pointA, pointB } = action.payload;

      return {
        ...state,
        adresses: state.adresses.map((adress) => {
          if (adress.key === key) {
            return {
              key: adress.key,
              num: adress.num,
              createdAt: adress.createdAt,
              pointA: pointA,
              pointB: pointB,
            };
          }
          return adress;
        }),
      };
    },

    setSelectedAdress: (state, action) => {
      const { key, num, createdAt, pointA, pointB } = action.payload;

      const selected = {
        key: key,
        num: num ? num : current(state).selected.num,
        createdAt: createdAt ? createdAt : current(state).selected.createdAt,
        pointA: pointA ? pointA : current(state).selected.pointA,
        pointB: pointB ? pointB : current(state).selected.pointB,
      };

      return { ...state, selected: selected };
    },
  },
});

export const getSelectedAdress = (state) => state.adresses.selected;
export const getAdresses = (state) => state.adresses.adresses;
export const getPoints = (state) => state.adresses.points.points;

export const { setAdresses, setSelectedAdress, updatePointsAdresses } =
  adressesSlice.actions;

export default adressesSlice.reducer;
