import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../..'

const initialState: User = {
  email: '',
  isLogged: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<User, 'isLogged'>>) => {
      if (!action.payload.email || 
          !action.payload.email.includes('@' || 
          !action.payload.email.includes('.com'))
      ) { 
        return state; 
      }

      return { email: action.payload.email, isLogged: true }
    },
    removeUser: () => {
      return initialState
    }
  },
})

export const { setUser, removeUser } = userSlice.actions
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer