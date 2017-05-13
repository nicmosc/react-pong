import React from 'react';


const If = ({
  cond,
  inline,
  fallback,
  children,
  style,
  className,
  component,
}) => {
  const childrenLength = React.Children.toArray(children).length;

  if ( ! cond) {
    if ( ! fallback) {
      return null;
    }
    if (fallback === 'span') {
      return <span style={style} />
    }
    if (fallback === 'div') {
      return <div style={style} />
    }
  }

  if (component) {
    return React.createElement(component, {
      style,
      className,
    });
  }

  if (childrenLength === 1) {
    return React.cloneElement(children);
  }

  if (inline) {
    return (
      <span style={style} className={className}>
        {children}
      </span>
    );
  }

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};

export default If;
