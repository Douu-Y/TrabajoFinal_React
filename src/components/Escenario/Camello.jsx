function Camello({ posicion,direccion }) {
return (
    <div
    style={{
        fontSize: "60px",
        position: "relative",
        left: `${posicion}px`,
        transition: "left 0.2s",
        display: "inline-block",
        transform: direccion === "derecha" ? "scaleX(-1)" : "scaleX(1)",
    }}
    >
    🐫
    </div>
);
}

export default Camello;
