import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useBattery } from '../../../context/BatteryContext'
import { useNavigation } from '../../../context/NavigationContext'
import BatterySelector from './BatterySelector'
import ChemistrySelector from './ChemistrySelector'
import './Header.css'

const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { monitoringStatus } = useBattery()
    const { activeSection } = useNavigation()

    const isActiveTab = (path) => {
        if (path === '/') {
            return location.pathname === '/'
        }
        return location.pathname === path
    }

    const handleTabClick = (path) => {
        navigate(path)
    }

    const renderSelectors = () => {
        // If not "Battery Pack Brain", show nothing
        if (activeSection !== 'Battery Pack Brain') {
            return null
        }

        // Existing logic for Hybrid vs Single Battery
        if (location.pathname === '/hybrid-battery') {
            return <BatterySelector label="BATTERY PACK" />
        }

        return (
            <>
                <ChemistrySelector />
                <BatterySelector />
            </>
        )
    }

    return (
        <header className="header">
            <div className="header-left">
                <div className="logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 6H20C20.5523 6 21 6.44772 21 7V17C21 17.5523 20.5523 18 20 18H17M17 6V18M17 6H7C6.44772 6 6 6.44772 6 7V17C6 17.5523 6.44772 18 7 18H17M3 10H6M3 14H6"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="logo-text">Battery Brain</span>
                </div>
            </div>

            <div className="header-center">
                <nav className="header-nav">
                    {activeSection === 'Battery Pack Brain' && (
                        <>
                            <button
                                className={`nav-tab ${isActiveTab('/') ? 'active' : ''}`}
                                onClick={() => handleTabClick('/')}
                            >
                                Battery Brain
                            </button>
                            <button
                                className={`nav-tab ${isActiveTab('/core-technology') ? 'active' : ''}`}
                                onClick={() => handleTabClick('/core-technology')}
                            >
                                Single Battery
                            </button>
                            <button
                                className={`nav-tab ${isActiveTab('/hybrid-battery') ? 'active' : ''}`}
                                onClick={() => handleTabClick('/hybrid-battery')}
                            >
                                Hybrid Battery
                            </button>
                        </>
                    )}
                </nav>
            </div>

            <div className="header-right">
                <div className="header-selectors">
                    {renderSelectors()}
                </div>
                <div className="monitoring-badge">
                    <span className="status-dot"></span>
                    {monitoringStatus}
                </div>
            </div>
        </header>
    )
}

export default Header
