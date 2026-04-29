const Tooltip = ({ text, children, position = "top" }) => (
    <span className={`tooltip-root tooltip-${position}`}>
        {children}
        <span className="tooltip-label">{text}</span>
    </span>
);

export default Tooltip;
