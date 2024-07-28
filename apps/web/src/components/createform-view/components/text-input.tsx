import { Field, ErrorMessage } from 'formik';
import { ChangeEvent } from 'react';

interface TextInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  className?: string;
  rows?: number;
  onInput?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  id,
  name,
  label,
  type = 'text',
  className,
  rows,
  onInput,
}: TextInputProps) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <Field
      id={id}
      name={name}
      as={type === 'textarea' ? 'textarea' : 'input'}
      type={type === 'textarea' ? undefined : type}
      rows={type === 'textarea' ? rows : undefined}
      onInput={onInput}
      className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${className}`}
    />
    <ErrorMessage name={name} component="div" className="text-red-500 mt-1" />
  </div>
);

export default TextInput;
