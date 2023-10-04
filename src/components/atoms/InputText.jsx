import React from 'react'

const InputText = ({type, value, onChange, name, label}) => {
  return (
    <div className="flex gap-4">
          <span>{label}</span>
          <input type={type} value={value} onChange={onChange} name={name} />
    </div>
  )
}

export default InputText