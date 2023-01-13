import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './search';
import pickReducer from './pickAnimal';

export default configureStore({
  reducer: {
    search : searchReducer,
    pickAnimal : pickReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
})