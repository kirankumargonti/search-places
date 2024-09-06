import React, { useCallback, useState, useEffect } from 'react';
import './LimitInput.css';

interface LimitInputProps {
  value: number;
  setValue: (value: number) => void;
  label: string;
  max: number;
  setError: (error: string) => void;
  defaultValue: number;
  triggerUpdate?: () => void;
}

const LimitInput: React.FC<LimitInputProps> = React.memo(({ 
  value, setValue, label, max, setError, defaultValue, triggerUpdate 
}) => {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (!/^\d*$/.test(newValue)) {
      setError(`${label} must be a number`);
      return;
    }

    const numValue = parseInt(newValue, 10);
    if (isNaN(numValue) || numValue < 1) {
      setValue(1);
    } else if (numValue > max) {
      setValue(max);
      setError(`${label} cannot exceed ${max}`);
    } else {
      setValue(numValue);
      setError('');
    }
  }, [label, max, setError, setValue]);

  const handleBlur = useCallback(() => {
    if (inputValue === '' || parseInt(inputValue, 10) < 1) {
      setInputValue(defaultValue.toString());
      setValue(defaultValue);
    }
    if (triggerUpdate) {
      triggerUpdate();
    }
  }, [inputValue, setValue, defaultValue, triggerUpdate]);

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  return (
    <div className='limit-input'>
      <label htmlFor={label.toLowerCase().replace(' ', '-')}>{label}:</label>
      <input
        type='number'
        id={label.toLowerCase().replace(' ', '-')}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        min={1}
        max={max}
      />
    </div>
  );
});

export default LimitInput;
