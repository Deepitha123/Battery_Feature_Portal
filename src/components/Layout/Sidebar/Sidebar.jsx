import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { useNavigation } from '../../../context/NavigationContext'
import './Sidebar.css'

const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { toggleTheme, isDark } = useTheme()
    const { activeSection, setActiveSection } = useNavigation()

    // State to manage which sections are expanded
    const [expandedSections, setExpandedSections] = useState({
        'Market Intelligence': true,
        'Core Technology': true,
        'Site Operations': false,
        'Compliance & Export': false,
        'Sourcing Intel': false,
        'Cost Control': false
    })

    const toggleSection = (sectionName) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionName]: !prev[sectionName]
        }))
    }

    const navigationItems = [
        {
            id: 1,
            title: 'PRODUCT',
            items: [
                {
                    name: 'Market Intelligence',
                    icon: (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M3 17L8 12L11 15L17 9M17 9V13M17 9H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ),
                    path: '/market-intelligence',
                    subitems: ['Sales Enablement']
                },
                {
                    name: 'Core Technology',
                    icon: (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 3V6M10 14V17M14 10H17M3 10H6M13.5 6.5L15.5 4.5M4.5 15.5L6.5 13.5M6.5 6.5L4.5 4.5M15.5 15.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    ),
                    path: '/core-technology',
                    subitems: [
                        'LFP Peak Shaver Logic',
                        'The Tariff Buster Sim',
                        'Battery Pack Brain'
                    ]
                }
            ]
        },
        {
            id: 2,
            title: 'OPERATIONS',
            items: [
                {
                    name: 'Site Operations',
                    icon: (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 2L3 6V10C3 14.5 6 17.5 10 18C14 17.5 17 14.5 17 10V6L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ),
                    path: '/site-operations',
                    subitems: []
                },
                {
                    name: 'Compliance & Export',
                    icon: (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M9 2L3 5V9C3 13 6 16 9 17M11 17C14 16 17 13 17 9V5L11 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 8L14 10L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ),
                    path: '/compliance-export',
                    subitems: []
                }
            ]
        },
        {
            id: 3,
            title: 'SUPPLY CHAIN',
            items: [
                {
                    name: 'Sourcing Intel',
                    icon: (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M3 7L10 3L17 7M3 7L10 11M3 7V13L10 17M17 7L10 11M17 7V13L10 17M10 11V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ),
                    path: '/sourcing-intel',
                    subitems: []
                },
                {
                    name: 'Cost Control',
                    icon: (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    ),
                    path: '/cost-control',
                    subitems: []
                }
            ]
        }
    ]

    const isActive = (path) => location.pathname === path

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                {navigationItems.map(section => (
                    <div key={section.id} className="nav-section">
                        <div className="section-title">
                            {section.id}. {section.title}
                        </div>
                        {section.items.map(item => (
                            <div key={item.name} className="nav-item-container">
                                <button
                                    className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                                    onClick={() => {
                                        if (item.subitems.length > 0) {
                                            toggleSection(item.name)
                                        } else {
                                            setActiveSection(item.name)
                                            navigate(item.path)
                                        }
                                    }}
                                >
                                    <span className="nav-icon">{item.icon}</span>
                                    <span className="nav-text">{item.name}</span>
                                    {item.subitems.length > 0 && (
                                        <svg
                                            className={`nav-arrow ${expandedSections[item.name] ? 'expanded' : ''}`}
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                        >
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>
                                {expandedSections[item.name] && item.subitems.length > 0 && (
                                    <div className="subitems">
                                        {item.subitems.map(subitem => (
                                            <button
                                                key={subitem}
                                                className={`subitem ${subitem === activeSection ? 'highlighted' : ''}`}
                                                onClick={() => {
                                                    setActiveSection(subitem)
                                                    navigate(item.path)
                                                }}
                                            >
                                                {subitem}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="theme-toggle" onClick={toggleTheme}>
                    {isDark ? '☀️' : '🌙'} Toggle Theme
                </button>
            </div>
        </aside>
    )
}

export default Sidebar
