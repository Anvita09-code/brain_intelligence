import React from 'react';
import { tokens } from '../../design-system/tokens';

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement> {
  children: React.ReactNode;
}

export const Heading: React.FC<TypographyProps> = ({ children, style, ...props }) => (
  <h1 style={{ fontSize: tokens.typography.fontSize.xxl, fontWeight: tokens.typography.fontWeight.bold, color: tokens.colors.text.primary, ...style }} {...props}>{children}</h1>
);

export const Subheading: React.FC<TypographyProps> = ({ children, style, ...props }) => (
  <h2 style={{ fontSize: tokens.typography.fontSize.xl, fontWeight: tokens.typography.fontWeight.bold, color: tokens.colors.text.primary, ...style }} {...props}>{children}</h2>
);

export const Title: React.FC<TypographyProps> = ({ children, style, ...props }) => (
  <h3 style={{ fontSize: tokens.typography.fontSize.lg, fontWeight: tokens.typography.fontWeight.medium, color: tokens.colors.text.primary, ...style }} {...props}>{children}</h3>
);

export const Subtitle: React.FC<TypographyProps> = ({ children, style, ...props }) => (
  <h4 style={{ fontSize: tokens.typography.fontSize.base, fontWeight: tokens.typography.fontWeight.regular, color: tokens.colors.text.secondary, ...style }} {...props}>{children}</h4>
);

export const Body: React.FC<TypographyProps> = ({ children, style, ...props }) => (
  <p style={{ fontSize: tokens.typography.fontSize.base, fontWeight: tokens.typography.fontWeight.regular, lineHeight: tokens.typography.lineHeight.normal, color: tokens.colors.text.primary, ...style }} {...props}>{children}</p>
);

export const Caption: React.FC<TypographyProps> = ({ children, style, ...props }) => (
  <span style={{ fontSize: tokens.typography.fontSize.xs, color: tokens.colors.text.muted, ...style }} {...props}>{children}</span>
);

export const Label: React.FC<TypographyProps & { required?: boolean }> = ({ children, required, style, ...props }) => (
  <label style={{ fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.medium, color: tokens.colors.text.secondary, display: 'inline-block', marginBottom: '4px', ...style }} {...props}>
    {children}
    {required && <span style={{ color: tokens.colors.status.danger, marginLeft: '2px' }}>*</span>}
  </label>
);

export const MonospaceText: React.FC<TypographyProps> = ({ children, style, ...props }) => (
  <code style={{ fontFamily: tokens.typography.fontFamily.mono, fontSize: tokens.typography.fontSize.sm, color: tokens.colors.brand.accent, backgroundColor: tokens.colors.bg.deep, padding: '2px 4px', borderRadius: tokens.borderRadius.sm, ...style }} {...props}>{children}</code>
);

export const StatusText: React.FC<TypographyProps & { type: 'success' | 'warning' | 'danger' | 'info' }> = ({ children, type, style, ...props }) => {
  const colorMap = {
    success: tokens.colors.status.success,
    warning: tokens.colors.status.warning,
    danger: tokens.colors.status.danger,
    info: tokens.colors.status.info
  };
  return (
    <span style={{ fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.medium, color: colorMap[type], ...style }} {...props}>
      {children}
    </span>
  );
};
