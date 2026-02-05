import React, { createContext, useContext, useState, useCallback } from 'react'

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

    // New states for dynamic backend connection
    const [selectedAnalysis, setSelectedAnalysis] = useState('Voltage Profile')
    const [selectedCycle, setSelectedCycle] = useState(2)
    const [analysisResult, setAnalysisResult] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [batteryList, setBatteryList] = useState([])

    // Fetch battery list on mount
    React.useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/battery/list')
                if (response.ok) {
                    const data = await response.json()
                    setBatteryList(data)
                }
            } catch (err) {
                console.error('Failed to fetch battery list:', err)
            }
        }
        fetchList()
    }, [])

    const fetchAnalysisData = useCallback(async (analysisType, filename, cycleIdx) => {
        setIsLoading(true)
        setError(null)
        setAnalysisResult(null) // Clear previous result to prevent stale data UI crashes
        try {
            let endpoint = ''
            if (analysisType === 'Voltage Profile') endpoint = 'voltage'
            else if (analysisType === 'Current Profile') endpoint = 'current'
            else if (analysisType === 'Internal Resistance') endpoint = 'resistance'
            else if (analysisType === 'State of Health (SOH)') endpoint = 'soh'
            else {
                // Placeholder for other types
                setIsLoading(false)
                return
            }

            const url = `http://127.0.0.1:8000/api/v1/battery/${endpoint}?filename=${filename}${(!['resistance', 'soh'].includes(endpoint)) ? `&cycle_idx=${cycleIdx}` : ''}`
            const response = await fetch(url)
            if (!response.ok) throw new Error(`API Error: ${response.statusText}`)

            const data = await response.json()
            setAnalysisResult(data)
        } catch (err) {
            console.error('Fetch Error:', err)
            setError(err.message)
            setAnalysisResult(null)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const value = {
        selectedBattery,
        setSelectedBattery,
        selectedChemistry,
        setSelectedChemistry,
        selectedBatteryId,
        setSelectedBatteryId,
        monitoringStatus,
        setMonitoringStatus,
        // Added values
        selectedAnalysis,
        setSelectedAnalysis,
        selectedCycle,
        setSelectedCycle,
        analysisResult,
        fetchAnalysisData,
        isLoading,
        error,
        batteryList
    }

    return (
        <BatteryContext.Provider value={value}>
            {children}
        </BatteryContext.Provider>
    )
}
