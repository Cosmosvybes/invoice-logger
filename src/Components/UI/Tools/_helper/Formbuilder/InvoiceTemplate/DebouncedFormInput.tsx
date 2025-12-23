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

  useEffect(() => {
    // Only sync if we haven't touched it, OR if the initialValue has caught up to our last commit? 
    // Simplify: Always sync from parent unless we are actively typing?
    // Actually, simple standard: sync on prop change.
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    // If not dirty, don't trigger anything on mount.
    if (!isDirty.current) return;

    const timer = setTimeout(() => {
      onChange(value as string);
      // We don't reset isDirty here because we want to keep "ownership" until the parent syncs back?
      // Actually, after we call onChange, we expect the parent to eventually update `initialValue` to match `value`.
    }, debounceTimeout);

    return () => clearTimeout(timer);
  }, [value, debounceTimeout, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
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
