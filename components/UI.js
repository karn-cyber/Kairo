'use client';

export function Badge({ type = 'orange', children, dot = false, className = '', style = {}, ...props }) {
  const badgeClass = `badge badge-${type} ${className}`;
  return (
    <div className={badgeClass} style={style} {...props}>
      {dot && <div className="badge-dot"></div>}
      {children}
    </div>
  );
}

export function Button({ variant = 'primary', type = 'button', children, onClick, className = '', disabled = false, style = {}, ...props }) {
  const btnClass = `btn-${variant} ${className}`;
  return (
    <button className={btnClass} type={type} onClick={onClick} disabled={disabled} style={style} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className = '', style = {} }) {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
}
