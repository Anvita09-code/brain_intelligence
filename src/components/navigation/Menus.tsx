/**
 * IOB Menus – Dropdown, Context Menu, and Command Palette (Phase 2)
 */

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';
import { Check } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  checked?: boolean;
  divider?: boolean;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  onSelect: (itemId: string) => void;
  align?: 'left' | 'right';
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  DropdownMenu                                                       */
/* ------------------------------------------------------------------ */

export function DropdownMenu({
  trigger,
  items,
  onSelect,
  align = 'left',
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const enabledItems = items.filter((item) => !item.disabled && !item.divider);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % enabledItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + enabledItems.length) % enabledItems.length);
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        onSelect(enabledItems[activeIndex].id);
        setOpen(false);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    },
    [items, activeIndex, onSelect],
  );

  let enabledIdx = -1;

  return (
    <div className={cn('relative inline-block', className)}>
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        role="button"
        aria-haspopup="menu"
        aria-expanded={open}
        tabIndex={0}
      >
        {trigger}
      </div>

      {/* Menu */}
      {open && (
        <div
          ref={menuRef}
          role="menu"
          className="absolute z-[9998] py-1 min-w-[180px]"
          style={{
            top: '100%',
            marginTop: tokens.spacing.xs,
            [align === 'right' ? 'right' : 'left']: 0,
            backgroundColor: tokens.colors.bg.elevated,
            border: `1px solid ${tokens.colors.border.default}`,
            borderRadius: tokens.borderRadius.md,
            boxShadow: tokens.shadows.overlay,
          }}
        >
          {items.map((item) => {
            if (item.divider) {
              return (
                <hr
                  key={item.id}
                  style={{
                    border: 'none',
                    height: '1px',
                    backgroundColor: tokens.colors.border.subtle,
                    margin: `${tokens.spacing.xs} 0`,
                  }}
                />
              );
            }

            const thisIdx = item.disabled ? -1 : ++enabledIdx;

            return (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled) {
                    onSelect(item.id);
                    setOpen(false);
                  }
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-left transition-colors"
                style={{
                  color: item.disabled
                    ? tokens.colors.text.disabled
                    : item.danger
                      ? tokens.colors.status.danger
                      : tokens.colors.text.primary,
                  fontSize: tokens.typography.fontSize.sm,
                  backgroundColor: thisIdx === activeIndex
                    ? tokens.colors.bg.hover
                    : 'transparent',
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  transition: tokens.transitions.fast,
                }}
                onMouseEnter={() => !item.disabled && setActiveIndex(thisIdx)}
              >
                <span className="w-4 h-4 flex items-center justify-center shrink-0">
                  {item.checked ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    item.icon
                  )}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.shortcut && (
                  <span
                    style={{
                      color: tokens.colors.text.muted,
                      fontSize: tokens.typography.fontSize.xs,
                      fontFamily: tokens.typography.fontFamily.mono,
                    }}
                  >
                    {item.shortcut}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
