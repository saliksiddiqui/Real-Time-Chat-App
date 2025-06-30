import React from 'react'
import Navebar from './Navebar'
import Search from './Search'
import Contacts from './Contacts'

const Sidebar = ({setShowSidebar}) => {
  return (
    <>
    <div className="sidebar">
        <Navebar/>
        <Search/>
        <Contacts setShowSidebar={setShowSidebar}/>
    </div>
    </>
  )
}

export default Sidebar