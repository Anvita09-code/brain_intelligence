'use client';

import React from 'react';
import { tokens } from '../../design-system/tokens';
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Menu,
  Search,
  Settings,
  User,
} from '../icons';
import { Flex } from './Structural';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeItem?: string;
  groups: Array<{
    title?: string;
    items: Array<{
      id: string;
      label: string;
      icon: React.ComponentType<{
        size?: number;
        style?: React.CSSProperties;
        className?: string;
      }>;
    }>;
  }>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
  activeItem,
  groups,
}) => {
  return (
    <aside
      style={{
        width: isCollapsed ? '50px' : '240px',
        height: '100%',
        backgroundColor: tokens.colors.bg.surface,
        borderRight: `1px solid ${tokens.colors.border.default}`,
        display: 'flex',
        flexDirection: 'column',
        transition: tokens.transitions.fast,
        zIndex: 100,
      }}
    >
      <div
        style={{
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          padding: `0 ${tokens.spacing.md}`,
          borderBottom: `1px solid ${tokens.colors.border.subtle}`,
        }}
      >
        {!isCollapsed && (
          <span
            style={{
              fontWeight: tokens.typography.fontWeight.bold,
              fontSize: tokens.typography.fontSize.base,
              letterSpacing: '0.5px',
              color: tokens.colors.brand.accent,
            }}
          >
            IOB BRAIN
          </span>
        )}
        <button
          type="button"
          onClick={onToggle}
          aria-label="Toggle Navigation Panel"
          style={{
            background: 'none',
            border: 'none',
            color: tokens.colors.text.secondary,
            cursor: 'pointer',
            padding: tokens.spacing.xs,
            borderRadius: tokens.borderRadius.sm,
          }}
        >
          <Menu size={16} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: tokens.spacing.xs }}>
        {groups.map((group, gIdx) => (
          <div key={gIdx} style={{ marginBottom: tokens.spacing.md }}>
            {!isCollapsed && group.title && (
              <div
                style={{
                  fontSize: tokens.typography.fontSize.xs,
                  fontWeight: tokens.typography.fontWeight.bold,
                  color: tokens.colors.text.muted,
                  padding: `4px ${tokens.spacing.sm}`,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {group.title}
              </div>
            )}
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {group.items.map((item) => {
                const isActive = activeItem === item.id;
                const IconComponent = item.icon;

                return (
                  <li key={item.id} style={{ margin: '2px 0' }}>
                    <button
                      type="button"
                      aria-current={isActive ? 'page' : undefined}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                        padding: `${tokens.spacing.sm} ${
                          isCollapsed ? '0' : tokens.spacing.sm
                        }`,
                        background: isActive
                          ? tokens.colors.bg.active
                          : 'transparent',
                        border: 'none',
                        borderRadius: tokens.borderRadius.sm,
                        color: isActive
                          ? tokens.colors.brand.accent
                          : tokens.colors.text.primary,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: tokens.transitions.fast,
                      }}
                    >
                      <IconComponent
                        size={16}
                        style={{
                          marginRight: isCollapsed ? 0 : tokens.spacing.sm,
                          color: isActive
                            ? tokens.colors.brand.accent
                            : tokens.colors.text.secondary,
                        }}
                      />
                      {!isCollapsed && (
                        <span style={{ fontSize: tokens.typography.fontSize.sm }}>
                          {item.label}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: tokens.spacing.sm,
          borderTop: `1px solid ${tokens.colors.border.subtle}`,
        }}
      >
        <button
          type="button"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            padding: tokens.spacing.sm,
            background: 'none',
            border: 'none',
            color: tokens.colors.text.secondary,
            cursor: 'pointer',
          }}
        >
          <Settings
            size={16}
            style={{ marginRight: isCollapsed ? 0 : tokens.spacing.sm }}
          />
          {!isCollapsed && (
            <span style={{ fontSize: tokens.typography.fontSize.sm }}>
              System Parameters
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

interface NavbarProps {
  breadcrumbs: Array<{ label: string; href?: string }>;
  onThemeToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ breadcrumbs }) => {
  return (
    <header
      style={{
        height: '48px',
        backgroundColor: tokens.colors.bg.surface,
        borderBottom: `1px solid ${tokens.colors.border.default}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `0 ${tokens.spacing.lg}`,
        zIndex: 90,
      }}
    >
      <nav
        aria-label="Breadcrumb"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {breadcrumbs.map((bc, idx) => (
          <React.Fragment key={`${bc.label}-${idx}`}>
            {idx > 0 && (
              <ChevronRight
                size={12}
                style={{
                  margin: `0 ${tokens.spacing.xs}`,
                  color: tokens.colors.text.muted,
                }}
              />
            )}
            {bc.href && idx < breadcrumbs.length - 1 ? (
              <a
                href={bc.href}
                style={{
                  fontSize: tokens.typography.fontSize.sm,
                  fontWeight: tokens.typography.fontWeight.regular,
                  color: tokens.colors.text.secondary,
                  textDecoration: 'none',
                }}
              >
                {bc.label}
              </a>
            ) : (
              <span
                style={{
                  fontSize: tokens.typography.fontSize.sm,
                  fontWeight:
                    idx === breadcrumbs.length - 1
                      ? tokens.typography.fontWeight.medium
                      : tokens.typography.fontWeight.regular,
                  color:
                    idx === breadcrumbs.length - 1
                      ? tokens.colors.text.primary
                      : tokens.colors.text.secondary,
                }}
              >
                {bc.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search
            size={14}
            style={{
              position: 'absolute',
              left: tokens.spacing.sm,
              color: tokens.colors.text.muted,
            }}
          />
          <input
            type="search"
            placeholder="Search assets, telemetry tags..."
            style={{
              backgroundColor: tokens.colors.bg.deep,
              border: `1px solid ${tokens.colors.border.default}`,
              borderRadius: tokens.borderRadius.sm,
              padding: '4px 8px 4px 28px',
              color: tokens.colors.text.primary,
              fontSize: tokens.typography.fontSize.sm,
              width: '240px',
            }}
          />
        </div>

        <button
          type="button"
          aria-label="System Alerts"
          style={{
            background: 'none',
            border: 'none',
            color: tokens.colors.text.secondary,
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <Bell size={16} />
          <span
            style={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: tokens.colors.status.danger,
            }}
          />
        </button>

        <div
          style={{
            width: '1px',
            height: '16px',
            backgroundColor: tokens.colors.border.subtle,
          }}
        />

        <button
          type="button"
          aria-label="User Profile"
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            cursor: 'pointer',
            color: tokens.colors.text.primary,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: tokens.colors.brand.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <User size={12} />
          </div>
          <span
            style={{ fontSize: tokens.typography.fontSize.sm }}
            className="desktop-only"
          >
            Operator #04
          </span>
          <ChevronDown size={12} style={{ color: tokens.colors.text.secondary }} />
        </button>
      </div>
    </header>
  );
};
