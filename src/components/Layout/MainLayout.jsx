import React from 'react'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import './MainLayout.css'

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout">
            <Header />
            <div className="layout-container">
                <Sidebar />
                <main className="main-content">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default MainLayout
