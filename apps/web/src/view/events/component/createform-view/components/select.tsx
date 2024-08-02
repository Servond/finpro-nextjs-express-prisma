import { Field, ErrorMessage } from 'formik';

interface SelectProps {
  id: string;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  className?: string;
}

const Select = ({ id, name, label, options, className }: SelectProps) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <Field
      id={id}
      name={name}
      as="select"
      className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${className}`}
    >
      <option value="">Select a category</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Field>
    <ErrorMessage name={name} component="div" className="text-red-500 mt-1" />
  </div>
);

export default Select;
