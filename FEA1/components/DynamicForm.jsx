import React from 'react'
import '../styles/DynamicForm.css'

const DynamicForm = ({
  fields,
  values,
  onChange,
  onSubmit,
  submitLabel = 'Submit',
  className = ''
  , useFormWrapper = true
}) => {
  const handleChange = (name, value) => {
    onChange({ ...values, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(event)
  }

  const Wrapper = useFormWrapper ? 'form' : 'div'

  return (
    <Wrapper
      className={`dynamic-form ${className}`}
      {...(useFormWrapper ? { onSubmit: handleSubmit } : {})}
    >
      <div className="dynamic-form-grid">
        {fields.map((field) => (
          <div
            key={field.name}
            className="dynamic-form-field"
            style={{ gridColumn: field.gridColumn || 'auto' }}
          >
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                value={values[field.name] || ''}
                placeholder={field.placeholder}
                onChange={(event) => handleChange(field.name, event.target.value)}
              />
            ) : field.type === 'select' ? (
              <select
                id={field.name}
                value={values[field.name] || ''}
                onChange={(event) => handleChange(field.name, event.target.value)}
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                type={field.type || 'text'}
                value={values[field.name] || ''}
                placeholder={field.placeholder}
                onChange={(event) => handleChange(field.name, event.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <button
        type={useFormWrapper ? 'submit' : 'button'}
        className="dynamic-form-submit"
        onClick={useFormWrapper ? undefined : handleSubmit}
      >
        {submitLabel}
      </button>
    </Wrapper>
  )
}

export default DynamicForm
