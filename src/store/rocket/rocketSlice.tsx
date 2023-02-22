import { IRocket } from "@/models";
import { getFromStorage, saveToStorage } from "@/utils/helpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RocketState {
    rocketsList: IRocket[],
}

const initialState: RocketState = {
    rocketsList: [],
};

const rocketSlice = createSlice({
    name: "business",
    initialState,
    reducers: {
        addRocket: (state: RocketState, action: PayloadAction<IRocket>) => {
            state.rocketsList.push(action.payload)
            saveToStorage<IRocket[]>("rockets", state.rocketsList, true);
        },
        updateRocket: (state: RocketState, action: PayloadAction<IRocket>) => {
            const oldArr = state.rocketsList.filter(item => item.id !== action.payload.id);
            state.rocketsList = [...oldArr, action.payload];
            saveToStorage<IRocket[]>("rockets", state.rocketsList, true);
        },
        removeRocket: (state: RocketState, action: PayloadAction<number>) => {
            state.rocketsList = [...state.rocketsList.filter(rocket => rocket.id !== action.payload)]
            saveToStorage<IRocket[]>("rockets", state.rocketsList, true);
        },
        addRocketsArray: (state: RocketState, action: PayloadAction<IRocket[]>) => {
            state.rocketsList = [...action.payload]
        },
    }
}
);

export default rocketSlice.reducer;
export const { addRocket, updateRocket, removeRocket, addRocketsArray } = rocketSlice.actions;