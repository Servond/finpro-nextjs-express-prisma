import { Field } from 'formik';

interface CheckboxProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox = ({ name, label, checked, onChange }: CheckboxProps) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
      <Field type="checkbox" name={name} className="mr-2 leading-tight" checked={checked} onChange={onChange} />
      {label}
    </label>
  </div>
);

export default Checkbox;
