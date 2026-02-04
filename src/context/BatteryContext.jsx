import React, { createContext, useContext, useState } from 'react'

const BatteryContext = createContext()

export const useBattery = () => {
    const context = useContext(BatteryContext)
    if (!context) {
        throw new Error('useBattery must be used within a BatteryProvider')
    }
    return context
}

export const BatteryProvider = ({ children }) => {
    const [selectedBattery, setSelectedBattery] = useState('Single Battery')
    const [selectedChemistry, setSelectedChemistry] = useState('CALB (LFP)')
    const [selectedBatteryId, setSelectedBatteryId] = useState('CALB_0_B182.pkl')
    const [monitoringStatus, setMonitoringStatus] = useState('MONITORING LIVE')

    const value = {
        selectedBattery,
        setSelectedBattery,
        selectedChemistry,
        setSelectedChemistry,
        selectedBatteryId,
        setSelectedBatteryId,
        monitoringStatus,
        setMonitoringStatus
    }

    return (
        <BatteryContext.Provider value={value}>
            {children}
        </BatteryContext.Provider>
    )
}
