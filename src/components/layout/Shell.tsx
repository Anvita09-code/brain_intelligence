'use client';

import React from 'react';
import { tokens } from '../../design-system/tokens';
import { Flex, Stack } from './Structural';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
}) => {
  return (
    <div
      style={{
        padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
        borderBottom: `1px solid ${tokens.colors.border.default}`,
        backgroundColor: tokens.colors.bg.surface,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Stack gap="xxs">
        <h1
          style={{
            fontSize: tokens.typography.fontSize.xl,
            fontWeight: tokens.typography.fontWeight.bold,
            color: tokens.colors.text.primary,
            margin: 0,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <span
            style={{
              fontSize: tokens.typography.fontSize.sm,
              color: tokens.colors.text.muted,
            }}
          >
            {subtitle}
          </span>
        )}
      </Stack>
      {actions && (
        <Flex align="center" gap="sm">
          {actions}
        </Flex>
      )}
    </div>
  );
};

export const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main
      style={{
        flex: 1,
        padding: tokens.spacing.lg,
        overflowY: 'auto',
        backgroundColor: tokens.colors.bg.deep,
      }}
    >
      {children}
    </main>
  );
};

export const DashboardWrapper: React.FC<{
  sidebar: React.ReactNode;
  navbar: React.ReactNode;
  children: React.ReactNode;
}> = ({ sidebar, navbar, children }) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: tokens.colors.bg.deep,
      }}
    >
      {sidebar}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {navbar}
        {children}
      </div>
    </div>
  );
};
