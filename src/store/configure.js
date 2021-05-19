import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import * as modules from './modules'

const configure = (preloadedState) => {
  const store = configureStore({
    reducer: modules,
    middleware: [...getDefaultMiddleware()],
    preloadedState,
  })

  return store
}
export default configure
