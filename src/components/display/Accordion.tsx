/**
 * IOB Accordion – Collapsible Panel Component (Phase 2)
 *
 * Semantic <details>/<summary> based accordion for dense industrial panels.
 * Supports single or multiple open states.
 */

'use client';

import React, { useState, useCallback } from 'react';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';
import { ChevronDown } from '@/components/icons';

/* ------------------------------------------------------------------ */
/*  AccordionItem                                                      */
/* ------------------------------------------------------------------ */

export interface AccordionItemProps {
  id: string;
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: (id: string, open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  /** Icon or badge rendered before title */
  icon?: React.ReactNode;
}

export function AccordionItem({
  id,
  title,
  subtitle,
  defaultOpen = false,
  isOpen: controlledOpen,
  onToggle,
  children,
  className,
  icon,
}: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleToggle = useCallback(() => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onToggle?.(id, next);
  }, [id, isOpen, isControlled, onToggle]);

  return (
    <div
      className={cn('overflow-hidden', className)}
      style={{
        backgroundColor: tokens.colors.bg.surface,
        border: `1px solid ${tokens.colors.border.subtle}`,
        borderRadius: tokens.borderRadius.md,
      }}
    >
      {/* Header / Trigger */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${id}`}
        className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors"
        style={{
          transition: tokens.transitions.fast,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            tokens.colors.bg.hover;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            'transparent';
        }}
      >
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <span
              style={{
                color: tokens.colors.text.primary,
                fontSize: tokens.typography.fontSize.base,
                fontWeight: tokens.typography.fontWeight.medium,
              }}
            >
              {title}
            </span>
            {subtitle && (
              <span
                className="ml-2"
                style={{
                  color: tokens.colors.text.muted,
                  fontSize: tokens.typography.fontSize.xs,
                }}
              >
                {subtitle}
              </span>
            )}
          </div>
        </div>
        <ChevronDown
          className="w-4 h-4 transition-transform"
          style={{
            color: tokens.colors.text.muted,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: tokens.transitions.fast,
          }}
        />
      </button>

      {/* Collapsible Panel */}
      <div
        id={`accordion-panel-${id}`}
        role="region"
        aria-labelledby={id}
        className="overflow-hidden transition-all"
        style={{
          maxHeight: isOpen ? '2000px' : '0px',
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.25s ease-in-out, opacity 0.2s ease-in-out',
        }}
      >
        <div
          className="px-4 pb-4"
          style={{ borderTop: `1px solid ${tokens.colors.border.subtle}` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Accordion (Group)                                                  */
/* ------------------------------------------------------------------ */

/**
 * Plain-data shape accepted by the `items` prop (Section 6 spec style):
 *   <Accordion items={[{ id, title, content }]} />
 * This coexists with the compound `<Accordion><AccordionItem/></Accordion>`
 * API above — pass either `items` or `children`, not both.
 */
export interface AccordionItemData {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  /** Allow multiple items open at once; default false (single-open) */
  multiple?: boolean;
  /** Flat data-driven items (spec-compatible alternative to `children`) */
  items?: AccordionItemData[];
  children?: React.ReactNode;
  className?: string;
}

export function Accordion({ multiple = false, items, children, className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const handleToggle = useCallback(
    (id: string, open: boolean) => {
      setOpenIds((prev) => {
        const next = new Set(multiple ? prev : []);
        if (open) next.add(id);
        else next.delete(id);
        return next;
      });
    },
    [multiple],
  );

  // Data-driven usage: <Accordion items={[...]} />
  if (items) {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            id={item.id}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            isOpen={openIds.has(item.id)}
            onToggle={handleToggle}
          >
            {item.content}
          </AccordionItem>
        ))}
      </div>
    );
  }

  // Compound usage: <Accordion><AccordionItem id="..." .../></Accordion>
  // Clone children to inject controlled state
  const clonedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement<AccordionItemProps>(child)) return child;
    return React.cloneElement(child, {
      isOpen: openIds.has(child.props.id),
      onToggle: handleToggle,
    });
  });

  return <div className={cn('flex flex-col gap-2', className)}>{clonedChildren}</div>;
}
