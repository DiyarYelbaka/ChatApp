import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  defaultGreenColor: string,
  defaultGrayColor: string,
  defaultDarkColor: string,
  defaultBlueColor: string
}

const initialState: CounterState = {
  defaultGreenColor: '#0ACF83',
  defaultGrayColor: '#A09F99',
  defaultDarkColor: '#292F3F',
  defaultBlueColor: '#3b5998'
}

export const colorTemaSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {
    setGreenColor: (state, action: PayloadAction<number>) => {
      state.defaultGreenColor = action.payload
    },
    setGrayColor: (state, action: PayloadAction<number>) => {
      state.defaultGrayColor = action.payload
    },
    setDarkColor: (state, action: PayloadAction<number>) => {
      state.defaultDarkColor = action.payload
    },
    setBlueColor: (state, action: PayloadAction<number>) => {
      state.defaultBlueColor = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setGreenColor,
  setGrayColor,
  setDarkColor,
  setBlueColor
 } = colorTemaSlice.actions

export default colorTemaSlice.reducer