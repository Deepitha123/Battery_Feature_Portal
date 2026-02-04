import React, { useState } from 'react'
import { useBattery } from '../../../context/BatteryContext'
import './BatterySelector.css'

const ChemistrySelector = () => {
    const { selectedChemistry, setSelectedChemistry } = useBattery()
    const [isOpen, setIsOpen] = useState(false)

    const chemistries = [
        'CALB (LFP)',
        'NMC',
        'LTO',
        'NCA'
    ]

    const handleSelect = (chemistry) => {
        setSelectedChemistry(chemistry)
        setIsOpen(false)
    }

    return (
        <div className="chemistry-selector">
            <label className="selector-label">CHEMISTRY</label>
            <div className="dropdown">
                <button
                    className="dropdown-button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedChemistry}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                {isOpen && (
                    <div className="dropdown-menu">
                        {chemistries.map(chemistry => (
                            <button
                                key={chemistry}
                                className={`dropdown-item ${chemistry === selectedChemistry ? 'active' : ''}`}
                                onClick={() => handleSelect(chemistry)}
                            >
                                {chemistry}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChemistrySelector
