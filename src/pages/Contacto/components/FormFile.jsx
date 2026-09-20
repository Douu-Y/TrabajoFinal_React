import { useDropzone } from "react-dropzone";
import { useState, useEffect, useRef } from "react";

function FormFile({
label,
name,
required = false,
error = "",
value = [],
accept = {
    "image/jpeg": [".jpg", ".jpeg"],
},
maxSizeMB = 200,
onFilesChange = () => {},
}) {
const [archivos, setArchivos] = useState([]);
const [errorMsg, setErrorMsg] = useState("");
const [mensaje, setMensaje] = useState("");
const [archivoAmpliado, setArchivoAmpliado] = useState(null);
const MAX_FILES = 3;

// Mantiene sincronizados los archivos con el formulario principal.
const prevValueLength = useRef(value?.length || 0);

// 1. Notificar a React Hook Form cuando cambia el estado local de archivos (de forma segura fuera del render)
useEffect(() => {
    onFilesChange(archivos.map((a) => a.file));
}, [archivos, onFilesChange]);

// 2. Limpiar estado si la propiedad `value` de React Hook Form se vacía (después del reset del formulario)
useEffect(() => {
    if (value && value.length === 0 && prevValueLength.current > 0) {
    archivos.forEach((a) => a.preview && URL.revokeObjectURL(a.preview));
    setArchivos([]);
    setErrorMsg("");
    }
    prevValueLength.current = value?.length || 0;
}, [value]);

const onDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length > 0) {
    setErrorMsg("");

    setArchivos((prev) => {
        const espacioDisponible = MAX_FILES - prev.length;
        if (espacioDisponible <= 0) return prev;

        const nuevos = acceptedFiles.slice(0, espacioDisponible).map((file) => ({
        file,
        preview:
            file.type.startsWith("image/") ||
            file.type.startsWith("video/") ||
            file.type === "application/pdf"
            ? URL.createObjectURL(file)
            : null,
        }));

        return [...prev, ...nuevos];
    });
    }

    if (rejectedFiles.length > 0) {
    const primerError = rejectedFiles[0].errors[0];
    if (primerError.code === "file-too-large") {
        setErrorMsg(`El archivo supera el tamaño máximo de ${maxSizeMB}MB`);
    } else if (primerError.code === "file-invalid-type") {
        setErrorMsg("Tipo de archivo no permitido");
    } else if (primerError.code === "too-many-files") {
        setErrorMsg(`Solo puedes subir hasta ${MAX_FILES} archivos`);
    } else {
        setErrorMsg(primerError.message);
    }
    }
};

useEffect(() => {
    return () => {
    archivos.forEach((a) => a.preview && URL.revokeObjectURL(a.preview));
    };
}, [archivos]);

useEffect(() => {
    const handleEsc = (e) => {
    if (e.key === "Escape") setArchivoAmpliado(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
}, []);

const handleRemove = (index) => {
    setArchivos((prev) => {
    const eliminado = prev[index];
    if (eliminado && eliminado.preview) {
        URL.revokeObjectURL(eliminado.preview);
    }
    return prev.filter((_, i) => i !== index);
    });
    setMensaje("Archivo eliminado");
    setTimeout(() => setMensaje(""), 3000);
};

const getFileIcon = (type) => {
    if (type.includes("word") || type.includes("msword") || type.includes("officedocument")) return "📝";
    if (type.startsWith("video/")) return "🎬";
    return "📁";
};

const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: MAX_FILES,
    disabled: archivos.length >= MAX_FILES,
    maxSize: maxSizeMB * 1024 * 1024,
    accept,
});

return (
    <div>
    <label htmlFor={name} className="block text-sm font-semibold mb-2">
        {label} {required && "*"}
    </label>

    <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
        archivos.length >= MAX_FILES
            ? "theme-input theme-border cursor-not-allowed"
            : "theme-border"
        }`}
    >
        <input {...getInputProps({ id: name, name: name })} />
        <div className="text-4xl mb-3">📁</div>

        {isDragActive ? (
            <p className="font-medium text-(--color-accent)">Suelta el archivo aquí...</p>
        ) : (
        <>
            <p className="font-medium">Arrastra tu archivo aquí</p>
            <p className="theme-muted mt-3 font-bold">
            Archivos cargados: {archivos.length} / {MAX_FILES}
            </p>
            <p className="theme-muted text-sm mt-1">o haz clic para seleccionarlo</p>
        </>
        )}
    </div>

    {mensaje && <p className="mt-2 text-sm text-emerald-600 font-semibold">{mensaje}</p>}

    {archivos.length > 0 && (
        <div className="mt-3 space-y-3">
        {archivos.map((a, index) => (
            <div
            key={`${a.file.name}-${index}`}
            className="theme-muted-surface rounded-lg p-4 flex items-center justify-between gap-4"
            >
            <div className="text-left text-sm space-y-1">
                <p className="font-semibold">Archivo {index + 1}</p>
                <p><strong>Nombre:</strong> {a.file.name}</p>
                <p><strong>Tipo:</strong> {a.file.type || "Desconocido"}</p>
                <p><strong>Tamaño:</strong> {(a.file.size / 1024).toFixed(2)} KB</p>
                <p><strong>Última modificación:</strong> {new Date(a.file.lastModified).toLocaleDateString()}</p>
            </div>

            <div className="flex items-center gap-3">
                {a.file.type.startsWith("image/") && a.preview && (
                <img
                    src={a.preview}
                    alt={`Vista previa de ${a.file.name}`}
                    onClick={() => setArchivoAmpliado(a)}
                    className="w-24 h-24 object-cover rounded-lg border theme-border shrink-0 cursor-zoom-in"
                />
                )}

                {a.file.type.startsWith("video/") && a.preview && (
                <video
                    src={a.preview}
                    onClick={() => setArchivoAmpliado(a)}
                    className="w-24 h-24 object-cover rounded-lg border theme-border shrink-0 cursor-zoom-in"
                />
                )}

                {a.file.type === "application/pdf" && a.preview && (
                <div
                    onClick={() => setArchivoAmpliado(a)}
                    className="w-24 h-24 rounded-lg border theme-border shrink-0 cursor-zoom-in overflow-hidden"
                >
                    <embed src={a.preview} type="application/pdf" className="w-full h-full pointer-events-none" />
                </div>
                )}

                {!a.file.type.startsWith("image/") &&
                !a.file.type.startsWith("video/") &&
                a.file.type !== "application/pdf" && (
                    <div className="theme-muted-surface theme-border w-24 h-24 flex items-center justify-center text-4xl rounded-lg border shrink-0">
                    {getFileIcon(a.file.type)}
                    </div>
                )}

                <button
                type="button"
                onClick={() => handleRemove(index)}
                className="font-semibold text-sm px-2 py-1 rounded"
                >
                Eliminar
                </button>
            </div>
            </div>
        ))}
        </div>
    )}

    {(errorMsg || error) && <span className="text-sm font-semibold mt-1 block">{errorMsg || error}</span>}

    {archivoAmpliado && (
        <div
        onClick={() => setArchivoAmpliado(null)}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
        <div onClick={(e) => e.stopPropagation()} className="relative max-w-3xl max-h-[90vh] w-full">
            <button
            type="button"
            onClick={() => setArchivoAmpliado(null)}
            className="absolute -top-10 right-0 text-white text-3xl font-bold"
            >
            ✕
            </button>

            {archivoAmpliado.file.type.startsWith("image/") && (
            <img
                src={archivoAmpliado.preview}
                alt={`Vista ampliada de ${archivoAmpliado.file.name}`}
                className="w-full h-full max-h-[85vh] object-contain rounded-lg"
            />
            )}

            {archivoAmpliado.file.type.startsWith("video/") && (
            <video
                src={archivoAmpliado.preview}
                controls
                autoPlay
                className="w-full h-full max-h-[85vh] object-contain rounded-lg"
            />
            )}

            {archivoAmpliado.file.type === "application/pdf" && (
            <embed
                src={archivoAmpliado.preview}
                type="application/pdf"
                className="w-full h-[85vh] rounded-lg"
            />
            )}

            <p className="text-white text-center mt-3 text-sm">{archivoAmpliado.file.name}</p>
        </div>
        </div>
    )}
    </div>
);
}

export default FormFile;