import { forwardRef } from "react";

// Select reutilizable para opciones simples u objetos.
const FormSelect = forwardRef(function FormSelect(
    { label, name, options = [], required = false, error = "", ...rest }, ref) {

    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-semibold mb-2"
            >
                {label} {required && "*"}
            </label>
            <select
                id={name}
                name={name}
                required={required}
                ref={ref}
                {...rest}
                className="theme-input w-full border rounded-lg px-4 py-3 focus:outline-none transition">
                <option value="">
                    Selecciona una opción
                </option>
                {options.map((option) => (
                    <option
                        key={option.value ?? option}
                        value={option.value ?? option}
                    >
                        {option.label ?? option}
                    </option>
                ))}
            </select>
            {error && (
                <span className="text-sm font-semibold">
                    {error}
                </span>
            )}
        </div>
    );
});

export default FormSelect;