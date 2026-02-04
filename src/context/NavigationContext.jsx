import React, { createContext, useContext, useState } from 'react'

const NavigationContext = createContext()

export const useNavigation = () => {
    const context = useContext(NavigationContext)
    if (!context) {
        throw new Error('useNavigation must be used within a NavigationProvider')
    }
    return context
}

export const NavigationProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState('Battery Pack Brain')
    const [expandedSections, setExpandedSections] = useState({
        'Market Intelligence': true,
        'Core Technology': true,
        'Site Operations': false
    })

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    const value = {
        activeSection,
        setActiveSection,
        expandedSections,
        toggleSection
    }

    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    )
}
