import { forwardRef } from "react";

// Input reutilizable conectado con react-hook-form.
const FormInput = forwardRef(function FormInput({
    label,
    name,
    type = "text",
    required = false,
    placeholder = "",
    error = "",
    ...rest },
    ref 
) {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-semibold mb-2"
            >
                {label} {required && "*"}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                ref={ref}
                className="theme-input w-full border rounded-lg px-4 py-3 focus:outline-none transition"
                {...rest}
                />
            {error && <span className="text-sm font-semibold">{error}</span>}
        </div>
    );
});

export default FormInput;