import { AlertTriangle, X } from "lucide-react";
import "./ConfirmDialog.css";

function ConfirmDialog({ title, message, onCancel, onConfirm }) {
    return (
        // Dialogo reutilizable para confirmar acciones importantes.
        <div className="confirmacion-overlay" role="dialog" aria-modal="true" aria-labelledby="confirmacion-titulo">
            <div className="confirmacion-caja theme-surface">
                <button className="confirmacion-cerrar" type="button" onClick={onCancel} aria-label="Cerrar confirmación">
                    <X size={18} />
                </button>
                <div className="confirmacion-icono">
                    <AlertTriangle size={22} />
                </div>
                <h2 id="confirmacion-titulo">{title}</h2>
                <p className="theme-muted">{message}</p>
                <div className="confirmacion-acciones">
                    <button type="button" onClick={onCancel}>Cancelar</button>
                    <button className="theme-accent" type="button" onClick={onConfirm}>Confirmar</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;
