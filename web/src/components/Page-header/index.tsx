import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'
import backIcon from '../../assets/images/icons/back.svg'
import logoImage from '../../assets/images/logo.svg'

interface PageHeaderProps {
    title: String
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/" >
                    <img src={backIcon} alt="voltar" />
                </Link>
                <img src={logoImage} alt="Proffy" />
            </div>

            <div className="header-content">
                <strong>{title}</strong>
                {children}
            </div>
        </header>
    )
}

export default PageHeader