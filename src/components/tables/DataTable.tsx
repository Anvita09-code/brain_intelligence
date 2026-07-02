/**
 * IOB DataTable – Feature-rich data table for industrial telemetry (Phase 2)
 *
 * Semantic HTML <table> with sorting, selection, pagination, and dense layout.
 * Compatible with react-hook-form for inline editing patterns.
 */

'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type SortDirection = 'asc' | 'desc' | null;

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  mono?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  /** Unique row key accessor */
  rowKey: keyof T;
  /** Enable row selection checkboxes */
  selectable?: boolean;
  selectedRows?: Set<string | number>;
  onSelectionChange?: (selected: Set<string | number>) => void;
  /** Enable pagination */
  paginated?: boolean;
  pageSize?: number;
  /** Current page (controlled) */
  currentPage?: number;
  onPageChange?: (page: number) => void;
  /** Empty state content */
  emptyMessage?: string;
  /** Dense layout (reduced padding) */
  dense?: boolean;
  /** Sticky header */
  stickyHeader?: boolean;
  className?: string;
  /** Loading state */
  loading?: boolean;
}

/* ------------------------------------------------------------------ */
/*  DataTable                                                          */
/* ------------------------------------------------------------------ */

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  selectable = false,
  selectedRows: controlledSelected,
  onSelectionChange,
  paginated = false,
  pageSize = 20,
  currentPage: controlledPage,
  onPageChange,
  emptyMessage = 'No data to display',
  dense = false,
  stickyHeader = false,
  className,
  loading = false,
}: DataTableProps<T>) {
  /* ---- Sorting state ---- */
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  /* ---- Selection state (uncontrolled fallback) ---- */
  const [internalSelected, setInternalSelected] = useState<Set<string | number>>(new Set());
  const selected = controlledSelected ?? internalSelected;
  const setSelected = onSelectionChange ?? setInternalSelected;

  /* ---- Pagination state (uncontrolled fallback) ---- */
  const [internalPage, setInternalPage] = useState(1);
  const currentPage = controlledPage ?? internalPage;
  const setCurrentPage = onPageChange ?? setInternalPage;

  /* ---- Sorting logic ---- */
  const handleSort = useCallback(
    (colId: string) => {
      if (sortColumn === colId) {
        setSortDir((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'));
        if (sortDir === 'desc') setSortColumn(null);
      } else {
        setSortColumn(colId);
        setSortDir('asc');
      }
    },
    [sortColumn, sortDir],
  );

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDir) return data;
    const col = columns.find((c) => c.id === sortColumn);
    if (!col) return data;

    return [...data].sort((a, b) => {
      const aVal = typeof col.accessor === 'function' ? col.accessor(a) : a[col.accessor];
      const bVal = typeof col.accessor === 'function' ? col.accessor(b) : b[col.accessor];
      const aStr = String(aVal ?? '');
      const bStr = String(bVal ?? '');
      const cmp = aStr.localeCompare(bStr, undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortColumn, sortDir, columns]);

  /* ---- Pagination ---- */
  const totalPages = paginated ? Math.ceil(sortedData.length / pageSize) : 1;
  const paginatedData = paginated
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  /* ---- Selection handlers ---- */
  const toggleRow = useCallback(
    (key: string | number) => {
      const next = new Set(selected);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      setSelected(next);
    },
    [selected, setSelected],
  );

  const toggleAll = useCallback(() => {
    const allKeys = paginatedData.map((row) => row[rowKey] as string | number);
    const allSelected = allKeys.every((k) => selected.has(k));
    if (allSelected) {
      const next = new Set(selected);
      allKeys.forEach((k) => next.delete(k));
      setSelected(next);
    } else {
      setSelected(new Set([...selected, ...allKeys]));
    }
  }, [paginatedData, rowKey, selected, setSelected]);

  /* ---- Cell value resolver ---- */
  const getCellValue = (row: T, col: ColumnDef<T>): React.ReactNode => {
    const raw =
      typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor];
    if (col.render) return col.render(raw, row);
    return raw != null ? String(raw) : '—';
  };

  /* ---- Padding ---- */
  const cellPad = dense
    ? `${tokens.spacing.xs} ${tokens.spacing.sm}`
    : `${tokens.spacing.sm} ${tokens.spacing.lg}`;

  return (
    <div
      className={cn('flex flex-col overflow-hidden', className)}
      style={{
        backgroundColor: tokens.colors.bg.surface,
        border: `1px solid ${tokens.colors.border.subtle}`,
        borderRadius: tokens.borderRadius.md,
      }}
    >
      {/* Table wrapper */}
      <div className="overflow-x-auto flex-1">
        <table
          className="w-full border-collapse"
          style={{ fontSize: tokens.typography.fontSize.sm }}
          role="grid"
        >
          <thead
            style={{
              position: stickyHeader ? 'sticky' : 'static',
              top: 0,
              zIndex: 1,
              backgroundColor: tokens.colors.bg.elevated,
            }}
          >
            <tr>
              {selectable && (
                <th
                  className="text-center"
                  style={{
                    padding: cellPad,
                    width: '40px',
                    borderBottom: `1px solid ${tokens.colors.border.subtle}`,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={paginatedData.length > 0 && paginatedData.every((r) => selected.has(r[rowKey] as string | number))}
                    onChange={toggleAll}
                    className="w-3.5 h-3.5 rounded cursor-pointer"
                    style={{
                      accentColor: tokens.colors.brand.primary,
                    }}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.id}
                  className="text-left font-medium"
                  style={{
                    padding: cellPad,
                    color: tokens.colors.text.secondary,
                    fontSize: tokens.typography.fontSize.xs,
                    fontWeight: tokens.typography.fontWeight.medium,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderBottom: `1px solid ${tokens.colors.border.subtle}`,
                    width: col.width,
                    textAlign: col.align ?? 'left',
                    cursor: col.sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={col.sortable ? () => handleSort(col.id) : undefined}
                  aria-sort={
                    sortColumn === col.id
                      ? sortDir === 'asc'
                        ? 'ascending'
                        : sortDir === 'desc'
                          ? 'descending'
                          : 'none'
                      : undefined
                  }
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <span className="inline-flex flex-col">
                        {sortColumn === col.id ? (
                          sortDir === 'asc' ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : sortDir === 'desc' ? (
                            <ChevronDown className="w-3 h-3" />
                          ) : (
                            <ChevronsUpDown className="w-3 h-3 opacity-40" />
                          )
                        ) : (
                          <ChevronsUpDown className="w-3 h-3 opacity-30" />
                        )}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="text-center py-8"
                  style={{ color: tokens.colors.text.muted }}
                >
                  Loading…
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="text-center py-12"
                  style={{ color: tokens.colors.text.muted }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIdx) => {
                const key = row[rowKey] as string | number;
                const isSelected = selected.has(key);

                return (
                  <tr
                    key={key}
                    className="transition-colors"
                    style={{
                      backgroundColor: isSelected
                        ? tokens.colors.bg.active
                        : 'transparent',
                      borderBottom: `1px solid ${tokens.colors.border.subtle}`,
                      transition: tokens.transitions.fast,
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                          tokens.colors.bg.hover;
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                        isSelected ? tokens.colors.bg.active : 'transparent';
                    }}
                  >
                    {selectable && (
                      <td className="text-center" style={{ padding: cellPad }}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRow(key)}
                          className="w-3.5 h-3.5 rounded cursor-pointer"
                          style={{ accentColor: tokens.colors.brand.primary }}
                          aria-label={`Select row ${key}`}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.id}
                        style={{
                          padding: cellPad,
                          color: tokens.colors.text.primary,
                          fontFamily: col.mono
                            ? tokens.typography.fontFamily.mono
                            : undefined,
                          textAlign: col.align ?? 'left',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {getCellValue(row, col)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {paginated && totalPages > 1 && (
        <div
          className="flex items-center justify-between px-4 py-3 shrink-0"
          style={{ borderTop: `1px solid ${tokens.colors.border.subtle}` }}
        >
          <span
            style={{
              color: tokens.colors.text.muted,
              fontSize: tokens.typography.fontSize.xs,
            }}
          >
            Showing {(currentPage - 1) * pageSize + 1}–
            {Math.min(currentPage * pageSize, sortedData.length)} of{' '}
            {sortedData.length}
          </span>

          <div className="flex items-center gap-1">
            <PaginationButton
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(1)}
              ariaLabel="First page"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
            </PaginationButton>
            <PaginationButton
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              ariaLabel="Previous page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </PaginationButton>

            <span
              className="px-3"
              style={{
                color: tokens.colors.text.primary,
                fontSize: tokens.typography.fontSize.sm,
                fontFamily: tokens.typography.fontFamily.mono,
              }}
            >
              {currentPage} / {totalPages}
            </span>

            <PaginationButton
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              ariaLabel="Next page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </PaginationButton>
            <PaginationButton
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(totalPages)}
              ariaLabel="Last page"
            >
              <ChevronsRight className="w-3.5 h-3.5" />
            </PaginationButton>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PaginationButton                                                   */
/* ------------------------------------------------------------------ */

function PaginationButton({
  children,
  disabled,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="p-1.5 rounded transition-colors"
      style={{
        color: disabled ? tokens.colors.text.disabled : tokens.colors.text.secondary,
        backgroundColor: 'transparent',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        borderRadius: tokens.borderRadius.sm,
        transition: tokens.transitions.fast,
      }}
    >
      {children}
    </button>
  );
}
