import { useTravelForm } from "@/hooks/use-travel-form";

export default function FormFields({ fields, errors }) {
  const { formData, updateFormData } = useTravelForm();

  return fields.map(
    ({ label, validation, options, excludeField, min, ...field }) => {
      const props = {
        ...field,
        id: field.name,
        value: formData[field.name],
        onChange: (event) => updateFormData(field.name, event.target.value),
        "aria-invalid": Boolean(errors[field.name]),
        "aria-describedby": errors[field.name]
          ? `${field.name}-error`
          : undefined,
      };

      return (
        <div className="field" key={field.name}>
          <label htmlFor={field.name}>
            {label}
            {field.required && " *"}
          </label>
          {field.type === "select" ? (
            <select {...props}>
              <option value="">{field.placeholder}</option>
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={
                    Boolean(excludeField) &&
                    option.value === formData[excludeField]
                  }
                >
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input {...props} min={typeof min === "function" ? min() : min} />
          )}
          {errors[field.name] && (
            <p className="error" id={`${field.name}-error`}>
              {errors[field.name]}
            </p>
          )}
        </div>
      );
    },
  );
}
