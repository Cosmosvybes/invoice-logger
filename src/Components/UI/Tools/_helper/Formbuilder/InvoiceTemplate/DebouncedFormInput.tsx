import React, { useEffect, useState, useRef } from "react";
import { Input, InputProps } from "reactstrap";

interface DebouncedFormInputProps extends Omit<InputProps, "onChange"> {
  value: string | number | readonly string[] | undefined;
  onChange: (value: string) => void;
  debounceTimeout?: number;
}

const DebouncedFormInput: React.FC<DebouncedFormInputProps> = ({
  value: initialValue,
  onChange,
  debounceTimeout = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  
  // Ref to track if the current value is dirty (user modified)
  // This prevents resetting the value if the parent re-renders with the old value while the user is typing
  const isDirty = useRef(false);

  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    // If not dirty, don't trigger anything on mount.
    if (!isDirty.current) return;

    const timer = setTimeout(() => {
      onChange(value as string);
      isDirty.current = false; // Reset dirty after sync
    }, debounceTimeout);

    return () => {
        clearTimeout(timer);
    };
  }, [value, debounceTimeout, onChange]);

  // Flush on unmount ONLY
  useEffect(() => {
      return () => {
          if (isDirty.current && valueRef.current !== undefined) {
               onChange(valueRef.current as string);
          }
      }
  }, []); // Empty dependency array ensures this ONLY runs on unmount

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    valueRef.current = val;
    isDirty.current = true;
  };

  return (
    <Input
      {...props}
      value={value}
      onChange={handleChange}
    />
  );
};

export default DebouncedFormInput;
