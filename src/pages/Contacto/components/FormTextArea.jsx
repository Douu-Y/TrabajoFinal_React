import { forwardRef } from "react";

// Campo de mensaje reutilizable.
const FormTextArea = forwardRef(function FormTextArea(
    { label, name, required = false, placeholder = "", error = "", ...rest }, ref ) {

    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-semibold mb-2"
            >
                {label} {required && "*"}
            </label>
            <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                required={required}
                ref={ref}
                {...rest}
                className="theme-input w-full border rounded-lg px-4 py-3 resize-none focus:outline-none transition"
            />
            {error && (
                <span className="text-sm font-semibold">
                    {error}
                </span>
            )}
        </div>
    );
});

export default FormTextArea;