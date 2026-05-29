import React from 'react'
import '../styles/Skeleton.css'

const MovieCardSkeleton = () => (
  <div className="skeleton-movie-card">
    <div className="skeleton-image"></div>
    <div className="skeleton-title"></div>
    <div className="skeleton-text"></div>
  </div>
)

const MovieRowSkeleton = () => (
  <div className="skeleton-row">
    <div className="skeleton-row-title"></div>
    <div className="skeleton-row-items">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="skeleton-movie-card">
          <div className="skeleton-image"></div>
        </div>
      ))}
    </div>
  </div>
)

const MovieDetailsSkeleton = () => (
  <div className="skeleton-details">
    <div className="skeleton-banner"></div>
    <div className="skeleton-info">
      <div className="skeleton-title skeleton-large"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text skeleton-short"></div>
    </div>
  </div>
)

const CommentSkeleton = () => (
  <div className="skeleton-comment">
    <div className="skeleton-author"></div>
    <div className="skeleton-text"></div>
    <div className="skeleton-date"></div>
  </div>
)

const FormFieldSkeleton = () => (
  <div className="skeleton-form-field">
    <div className="skeleton-label"></div>
    <div className="skeleton-input"></div>
  </div>
)

export { MovieCardSkeleton, MovieRowSkeleton, MovieDetailsSkeleton, CommentSkeleton, FormFieldSkeleton }
