import React from 'react'
import Header from './components/header/Header'
import Home from './components/home/Home'
import CommonSnackbar from './components/common/CommonSnackbar'

const App = () => {
  return (
    <div>
    <CommonSnackbar />
       {/* <Header/> */}
       <Home/>
    </div>
  )
}

export default App