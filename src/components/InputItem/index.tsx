import { FC } from 'react'

import './styles.scss'

import { InputBlockPropsType } from './types'

export const InputItem: FC<InputBlockPropsType> = ({
  label,
  onChange,
  value,
}) => (
  <div className="input">
    <label className="input__label">{label}</label>
    <input
      className="input__item"
      type="number"
      value={value}
      onChange={onChange}
    />
  </div>
)
