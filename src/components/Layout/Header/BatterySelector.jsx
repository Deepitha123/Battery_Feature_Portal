import React, { useState } from 'react'
import { useBattery } from '../../../context/BatteryContext'
import './BatterySelector.css'

const BatterySelector = ({ label = 'BATTERY ID' }) => {
    const { selectedBatteryId, setSelectedBatteryId } = useBattery()
    const [isOpen, setIsOpen] = useState(false)

    const batteries = [
        'CALB_0_B182.pkl', 'CALB_0_B183.pkl', 'CALB_0_B184.pkl', 'CALB_0_B185.pkl',
        'CALB_0_B187.pkl', 'CALB_0_B188.pkl', 'CALB_0_B189.pkl', 'CALB_0_B190.pkl',
        'CALB_25_T25-1.pkl', 'CALB_25_T25-2.pkl',
        'CALB_35_B173.pkl', 'CALB_35_B174.pkl', 'CALB_35_B175.pkl',
        'CALB_35_B222.pkl', 'CALB_35_B223.pkl', 'CALB_35_B224.pkl',
        'CALB_35_B227.pkl', 'CALB_35_B228.pkl', 'CALB_35_B229.pkl', 'CALB_35_B230.pkl',
        'CALB_35_B247.pkl', 'CALB_35_B248.pkl', 'CALB_35_B249.pkl', 'CALB_35_B250.pkl',
        'CALB_45_B253.pkl', 'CALB_45_B255.pkl', 'CALB_45_B256.pkl'
    ]

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
