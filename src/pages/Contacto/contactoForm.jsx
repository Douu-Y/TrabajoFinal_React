import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import FormTextArea from "./components/FormTextArea";
import FormFile from "./components/FormFile";
import paises from "./data/paises";
import ciudades from "./data/ciudades";
import generos from "./data/generos";
import { toast } from 'react-toastify';

export const ContactoForm = () => {
const [enviando, setEnviando] = useState(false);

const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
} = useForm({
    mode: "onBlur",
    defaultValues: {
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    genero: "",
    pais: "",
    ciudad: "",
    email: "",
    telefono: "",
    mensaje: "",
    archivo: [],
    },
});

const onSubmit = async (data) => {
    // Prepara los campos y archivos para Formspree.
    setEnviando(true);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (key === "archivo") {
            value.forEach((file) => formData.append("archivo", file));
        } else {
            formData.append(key, value);
        }
    });

    try {
        const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
            method: "POST",
            body: formData,
            headers: { Accept: "application/json" },
        });

        if (response.ok) {
            console.log("Datos del formulario:", data);
            toast.success("Tu mensaje fue enviado correctamente");
            reset();
        } else {
            const resultado = await response.json();
            const mensajeError = resultado.errors
                ? resultado.errors.map((e) => e.message).join(", ")
                : "Ocurrió un error al enviar el formulario";
            toast.error(mensajeError);
        }
    } catch (error) {
        console.error("Error de red al enviar el formulario:", error);
        toast.error("Revisa tu conexión a internet e intenta de nuevo.");
    } finally {
        setEnviando(false);
    }
};

return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
        label="Primer nombre"
        placeholder="Primer nombre"
        error={errors.primerNombre?.message}
        required
        {...register("primerNombre", { required: "El primer nombre es obligatorio" })}
        />
        <FormInput
        label="Segundo nombre"
        placeholder="Segundo nombre"
        error={errors.segundoNombre?.message}
        {...register("segundoNombre")}
        />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
        label="Primer apellido"
        placeholder="Primer apellido"
        error={errors.primerApellido?.message}
        required
        {...register("primerApellido", { required: "El primer apellido es obligatorio" })}
        />
        <FormInput
        label="Segundo apellido"
        placeholder="Segundo apellido"
        error={errors.segundoApellido?.message}
        {...register("segundoApellido")}
        />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
        label="Género"
        options={generos}
        error={errors.genero?.message}
        required
        {...register("genero", { required: "El género es obligatorio" })}
        />
        <FormSelect
        label="País"
        options={paises}
        error={errors.pais?.message}
        required
        {...register("pais", { required: "El país es obligatorio" })}
        />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
        label="Ciudad"
        options={ciudades}
        error={errors.ciudad?.message}
        required
        {...register("ciudad", { required: "La ciudad es obligatoria" })}
        />
        <FormInput
        label="Correo electrónico"
        type="email"
        placeholder="tucorreo@ejemplo.com"
        error={errors.email?.message}
        required
        {...register("email", {
            required: "El correo electrónico es obligatorio",
            pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "El correo electrónico no es válido",
            },
        })}
        />
    </div>

    <FormInput
        label="Teléfono"
        type="tel"
        placeholder="Ej: 3001234567"
        error={errors.telefono?.message}
        required
        {...register("telefono", {
        required: "El teléfono es obligatorio",
        pattern: {
            value: /^[0-9]{10}$/,
            message: "El teléfono debe tener 10 dígitos",
        },
        })}
    />

    <FormTextArea
        label="Mensaje"
        placeholder="Escribe tu mensaje aquí..."
        error={errors.mensaje?.message}
        required
        {...register("mensaje", { required: "El mensaje es obligatorio" })}
    />

    <div>
        <Controller
        name="archivo"
        control={control}
        render={({ field }) => (
            <FormFile
            label="Adjuntar archivo"
            name="archivo"
            accept={{
                "application/pdf": [".pdf"],
                "image/png": [".png"],
                "image/jpeg": [".jpg", ".jpeg"],
                "video/*": [],
            }}
            onFilesChange={field.onChange}
            error={errors.archivo?.message}
            value={field.value}
            />
        )}
        />
    </div>

    <button
        type="submit"
        disabled={enviando}
        className="theme-accent w-full md:w-auto font-semibold px-8 py-3 rounded-lg"
    >
        {enviando ? "Enviando..." : "Enviar mensaje"}
    </button>
    </form>
);
};

export default ContactoForm;