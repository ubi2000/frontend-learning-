import React from 'react'
import '../styles/SkeletonLoader.css'

const SkeletonLoader = ({ variant = 'card', count = 6, title }) => {
  if (variant === 'banner') {
    return (
      <div className="skeleton-banner">
        <div className="skeleton-banner-content">
          <div className="skeleton-title" />
          <div className="skeleton-buttons">
            <div className="skeleton-button" />
            <div className="skeleton-button" />
          </div>
          <div className="skeleton-text" />
          <div className="skeleton-text short" />
        </div>
      </div>
    )
  }

  return (
    <div className="skeleton-row">
      {title && <div className="skeleton-row-title">{title}</div>}
      <div className="skeleton-cards">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="skeleton-card" />
        ))}
      </div>
    </div>
  )
}

export default SkeletonLoader
