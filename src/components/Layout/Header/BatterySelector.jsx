import React, { useState } from 'react'
import { useBattery } from '../../../context/BatteryContext'
import './BatterySelector.css'

const BatterySelector = ({ label = 'BATTERY ID' }) => {
    const { selectedBatteryId, setSelectedBatteryId, batteryList } = useBattery()
    const [isOpen, setIsOpen] = useState(false)

    const batteries = batteryList.length > 0 ? batteryList : [selectedBatteryId]

    const handleSelect = (battery) => {
        setSelectedBatteryId(battery)
        setIsOpen(false)
    }

    return (
        <div className="battery-selector">
            <label className="selector-label">{label}</label>
            <div className="dropdown">
                <button
                    className="dropdown-button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedBatteryId}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                {isOpen && (
                    <div className="dropdown-menu">
                        {batteries.map(battery => (
                            <button
                                key={battery}
                                className={`dropdown-item ${battery === selectedBatteryId ? 'active' : ''}`}
                                onClick={() => handleSelect(battery)}
                            >
                                {battery}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default BatterySelector
