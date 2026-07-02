import React from 'react';
import { tokens } from '../../design-system/tokens';

/* ------------------------------------------------------------------ */
/* Shared typography props                                             */
/* ------------------------------------------------------------------ */

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/* Heading                                                             */
/* ------------------------------------------------------------------ */

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: HeadingLevel;
}

export const Heading: React.FC<HeadingProps> = ({ children, level = 'h1', style, ...props }) => {
  const sizeMap: Record<HeadingLevel, string> = {
    h1: tokens.typography.fontSize.xxl,
    h2: tokens.typography.fontSize.xl,
    h3: tokens.typography.fontSize.lg,
    h4: tokens.typography.fontSize.base,
  };

  const headingStyle: React.CSSProperties = {
    fontSize: sizeMap[level],
    fontWeight: tokens.typography.fontWeight.bold,
    color: tokens.colors.text.primary,
    margin: 0,
    ...style,
  };

  switch (level) {
    case 'h2':
      return <h2 style={headingStyle} {...props}>{children}</h2>;
    case 'h3':
      return <h3 style={headingStyle} {...props}>{children}</h3>;
    case 'h4':
      return <h4 style={headingStyle} {...props}>{children}</h4>;
    default:
      return <h1 style={headingStyle} {...props}>{children}</h1>;
  }
};

/* ------------------------------------------------------------------ */
/* Text / Body                                                         */
/* ------------------------------------------------------------------ */

export type TextSize = 'xs' | 'sm' | 'base' | 'lg';
export type TextVariant = 'primary' | 'secondary' | 'muted' | 'disabled';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: 'p' | 'span';
  size?: TextSize;
  variant?: TextVariant;
}

export const Text: React.FC<TextProps> = ({
  children,
  as: Tag = 'p',
  size = 'base',
  variant = 'primary',
  style,
  ...props
}) => {
  const colorMap: Record<TextVariant, string> = {
    primary: tokens.colors.text.primary,
    secondary: tokens.colors.text.secondary,
    muted: tokens.colors.text.muted,
    disabled: tokens.colors.text.disabled,
  };

  const textStyle: React.CSSProperties = {
    fontSize: tokens.typography.fontSize[size],
    fontWeight: tokens.typography.fontWeight.regular,
    lineHeight: tokens.typography.lineHeight.normal,
    color: colorMap[variant],
    margin: 0,
    ...style,
  };

  if (Tag === 'span') {
    return <span style={textStyle} {...props}>{children}</span>;
  }
  return <p style={textStyle} {...props}>{children}</p>;
};

/* Keep Body as alias */
export const Body: React.FC<TextProps> = (props) => <Text {...props} />;
Body.displayName = 'Body';

/* ------------------------------------------------------------------ */
/* Label (proper label element with htmlFor support)                   */
/* ------------------------------------------------------------------ */

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({ children, required, style, ...props }) => (
  <label
    style={{
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.medium,
      color: tokens.colors.text.secondary,
      display: 'inline-block',
      marginBottom: '4px',
      ...style,
    }}
    {...props}
  >
    {children}
    {required && (
      <span style={{ color: tokens.colors.status.danger, marginLeft: '2px' }}>*</span>
    )}
  </label>
);

/* ------------------------------------------------------------------ */
/* Code / Monospace                                                    */
/* ------------------------------------------------------------------ */

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Code: React.FC<CodeProps> = ({ children, style, ...props }) => (
  <code
    style={{
      fontFamily: tokens.typography.fontFamily.mono,
      fontSize: tokens.typography.fontSize.sm,
      color: tokens.colors.brand.accent,
      backgroundColor: tokens.colors.bg.deep,
      padding: '2px 4px',
      borderRadius: tokens.borderRadius.sm,
      ...style,
    }}
    {...props}
  >
    {children}
  </code>
);

/* Keep MonospaceText as alias */
export const MonospaceText: React.FC<CodeProps> = (props) => <Code {...props} />;
MonospaceText.displayName = 'MonospaceText';

/* ------------------------------------------------------------------ */
/* KPIValue – Large display metric value                               */
/* ------------------------------------------------------------------ */

export interface KPIValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  unit?: string;
}

export const KPIValue: React.FC<KPIValueProps> = ({ children, unit, style, ...props }) => (
  <span
    style={{
      fontSize: tokens.typography.fontSize.xxl,
      fontWeight: tokens.typography.fontWeight.bold,
      color: tokens.colors.brand.accent,
      fontFamily: tokens.typography.fontFamily.mono,
      ...style,
    }}
    {...props}
  >
    {children}
    {unit && (
      <span
        style={{
          fontSize: tokens.typography.fontSize.sm,
          fontWeight: tokens.typography.fontWeight.regular,
          color: tokens.colors.text.muted,
          marginLeft: '4px',
        }}
      >
        {unit}
      </span>
    )}
  </span>
);

/* ------------------------------------------------------------------ */
/* Caption                                                             */
/* ------------------------------------------------------------------ */

export const Caption: React.FC<TypographyProps> = ({ children, style, ...props }) => (
  <span
    style={{
      fontSize: tokens.typography.fontSize.xs,
      color: tokens.colors.text.muted,
      ...style,
    }}
    {...props}
  >
    {children}
  </span>
);

/* ------------------------------------------------------------------ */
/* StatusText                                                          */
/* ------------------------------------------------------------------ */

export const StatusText: React.FC<
  TypographyProps & { type: 'success' | 'warning' | 'danger' | 'info' }
> = ({ children, type, style, ...props }) => {
  const colorMap = {
    success: tokens.colors.status.success,
    warning: tokens.colors.status.warning,
    danger: tokens.colors.status.danger,
    info: tokens.colors.status.info,
  };
  return (
    <span
      style={{
        fontSize: tokens.typography.fontSize.sm,
        fontWeight: tokens.typography.fontWeight.medium,
        color: colorMap[type],
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
};
