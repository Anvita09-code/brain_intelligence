'use client';

import React from 'react';
import { tokens } from '../../design-system/tokens';

interface LayoutProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Container: React.FC<LayoutProps & { fluid?: boolean }> = ({
  children,
  fluid = false,
  style,
  ...props
}) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: fluid ? '100%' : '1440px',
        margin: '0 auto',
        paddingLeft: tokens.spacing.lg,
        paddingRight: tokens.spacing.lg,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const Section: React.FC<LayoutProps> = ({ children, style, ...props }) => {
  return (
    <section
      style={{
        paddingTop: tokens.spacing.xl,
        paddingBottom: tokens.spacing.xl,
        borderBottom: `1px solid ${tokens.colors.border.subtle}`,
        ...style,
      }}
      {...props}
    >
      {children}
    </section>
  );
};

interface FlexProps extends LayoutProps {
  direction?: 'row' | 'column';
  align?: 'stretch' | 'center' | 'flex-start' | 'flex-end';
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  gap?: keyof typeof tokens.spacing;
  wrap?: 'wrap' | 'nowrap';
}

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  align = 'stretch',
  justify = 'flex-start',
  gap,
  wrap = 'nowrap',
  style,
  ...props
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        gap: gap ? tokens.spacing[gap] : undefined,
        flexWrap: wrap,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const Stack: React.FC<Omit<FlexProps, 'direction'>> = (props) => {
  return <Flex direction="column" gap={props.gap || 'sm'} {...props} />;
};

interface GridProps extends LayoutProps {
  columns?: number | string;
  gap?: keyof typeof tokens.spacing;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 4,
  gap = 'lg',
  style,
  ...props
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns:
          typeof columns === 'number'
            ? `repeat(${columns}, minmax(0, 1fr))`
            : columns,
        gap: tokens.spacing[gap],
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const Divider: React.FC<{
  orientation?: 'horizontal' | 'vertical';
  margin?: keyof typeof tokens.spacing;
}> = ({ orientation = 'horizontal', margin = 'md' }) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      style={{
        width: isHorizontal ? '100%' : '1px',
        height: isHorizontal ? '1px' : '100%',
        backgroundColor: tokens.colors.border.subtle,
        marginTop: isHorizontal ? tokens.spacing[margin] : 0,
        marginBottom: isHorizontal ? tokens.spacing[margin] : 0,
        marginLeft: !isHorizontal ? tokens.spacing[margin] : 0,
        marginRight: !isHorizontal ? tokens.spacing[margin] : 0,
        display: isHorizontal ? 'block' : 'inline-block',
        alignSelf: 'stretch',
      }}
    />
  );
};

export const Spacer: React.FC<{
  size: keyof typeof tokens.spacing;
  horizontal?: boolean;
}> = ({ size, horizontal = false }) => {
  return (
    <div
      aria-hidden="true"
      style={{
        width: horizontal ? tokens.spacing[size] : '1px',
        height: !horizontal ? tokens.spacing[size] : '1px',
        flexShrink: 0,
      }}
    />
  );
};
