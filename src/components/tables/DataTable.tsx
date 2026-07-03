/**
 * IOB DataTable – Heavy telemetry / high-density table primitive.
 *
 * Integrated with the existing Phase 2 table wiring while also supporting the
 * lightweight Section 9 spec shape:
 *   columns: [{ header, accessor, width? }]
 *   data: [{ id, ... }]
 *
 * Existing richer usage continues to work through ColumnDef props such as
 * sortable, rowKey, selectable, pagination, alignment, mono cells, and render.
 */

"use client";

import React, { useCallback, useMemo, useState } from "react";
import { cn } from "@/components/lib/utils";
import { tokens } from "@/design-system/tokens";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
} from "@/components/icons";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type SortDirection = "asc" | "desc" | null;
export type DataTableRowKey = string | number;

/**
 * Lightweight column contract from the Heavy Telemetry / High Density Tables
 * spec. `id` is optional so callers can use only `header/accessor/width`.
 */
export interface Column<T extends object> {
  id?: string;
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  width?: string;
}

/**
 * Backwards-compatible richer column contract already used by the design
 * system guide. It extends the lightweight spec instead of replacing it.
 */
export interface ColumnDef<T extends object> extends Column<T> {
  sortable?: boolean;
  align?: "left" | "center" | "right";
  mono?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export type DataTableColumn<T extends object> = ColumnDef<T>;

export interface DataTableProps<T extends object> {
  columns: ColumnDef<T>[];
  data: T[];
  /** Unique row key accessor. Defaults to `id`, matching the pasted spec. */
  rowKey?: keyof T | ((row: T, index: number) => DataTableRowKey);
  /** Enable row selection checkboxes. */
  selectable?: boolean;
  selectedRows?: Set<DataTableRowKey>;
  onSelectionChange?: (selected: Set<DataTableRowKey>) => void;
  /** Enable pagination. */
  paginated?: boolean;
  pageSize?: number;
  /** Current page (controlled, 1-based). */
  currentPage?: number;
  onPageChange?: (page: number) => void;
  /** Empty and loading state copy. */
  emptyMessage?: string;
  loadingMessage?: string;
  /** Dense layout reduces cell padding below the default high-density spec. */
  dense?: boolean;
  /** Sticky header for telemetry streams inside scroll containers. */
  stickyHeader?: boolean;
  /** Render the telemetry footer / item counter. */
  showFooter?: boolean;
  className?: string;
  /** Loading state. */
  loading?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getColumnId<T extends object>(column: ColumnDef<T>, index: number): string {
  if (column.id) return column.id;
  if (typeof column.accessor === "string" || typeof column.accessor === "number") {
    return String(column.accessor);
  }
  if (typeof column.accessor === "symbol") {
    return column.accessor.description ?? `column-${index}`;
  }
  return `${column.header}-${index}`;
}

function isRowKey(value: unknown): value is DataTableRowKey {
  return typeof value === "string" || typeof value === "number";
}

function getRawValue<T extends object>(row: T, column: ColumnDef<T>): unknown {
  return typeof column.accessor === "function" ? column.accessor(row) : row[column.accessor];
}

function toComparable(value: unknown): string | number {
  if (typeof value === "number") return value;
  if (typeof value === "boolean") return value ? 1 : 0;
  if (value instanceof Date) return value.getTime();
  return String(value ?? "");
}

function compareValues(aValue: unknown, bValue: unknown): number {
  const aComparable = toComparable(aValue);
  const bComparable = toComparable(bValue);

  if (typeof aComparable === "number" && typeof bComparable === "number") {
    return aComparable - bComparable;
  }

  return String(aComparable).localeCompare(String(bComparable), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function renderFallbackCell(value: unknown): React.ReactNode {
  if (value == null) return "—";
  if (React.isValidElement(value)) return value;
  if (Array.isArray(value)) return value as React.ReactNode;

  switch (typeof value) {
    case "string":
    case "number":
      return value;
    case "boolean":
      return value ? "true" : "false";
    case "bigint":
      return value.toString();
    default:
      return String(value);
  }
}

/* ------------------------------------------------------------------ */
/*  DataTable                                                          */
/* ------------------------------------------------------------------ */

export function DataTable<T extends object>({
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
  emptyMessage = "No historical telemetry matrices stored.",
  loadingMessage = "Streaming metrics stream layer...",
  dense = false,
  stickyHeader = false,
  showFooter = true,
  className,
  loading = false,
}: DataTableProps<T>) {
  /* ---- Sorting state ---- */
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  /* ---- Selection state (uncontrolled fallback) ---- */
  const [internalSelected, setInternalSelected] = useState<Set<DataTableRowKey>>(new Set());
  const selected = controlledSelected ?? internalSelected;
  const setSelected = onSelectionChange ?? setInternalSelected;

  /* ---- Pagination state (uncontrolled fallback) ---- */
  const [internalPage, setInternalPage] = useState(1);
  const currentPage = controlledPage ?? internalPage;
  const setCurrentPage = onPageChange ?? setInternalPage;
  const safePageSize = Math.max(1, pageSize);

  const resolveRowKey = useCallback(
    (row: T, index: number): DataTableRowKey => {
      if (typeof rowKey === "function") return rowKey(row, index);

      const configuredValue = rowKey ? row[rowKey] : undefined;
      if (isRowKey(configuredValue)) return configuredValue;

      const idValue = (row as { id?: unknown }).id;
      if (isRowKey(idValue)) return idValue;

      return index;
    },
    [rowKey]
  );

  /* ---- Sorting logic ---- */
  const handleSort = useCallback(
    (columnId: string) => {
      if (sortColumn !== columnId) {
        setSortColumn(columnId);
        setSortDir("asc");
        return;
      }

      if (sortDir === "asc") {
        setSortDir("desc");
      } else {
        setSortColumn(null);
        setSortDir(null);
      }
    },
    [sortColumn, sortDir]
  );

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDir) return data;

    const columnWithIndex = columns
      .map((column, index) => ({ column, id: getColumnId(column, index) }))
      .find(({ id }) => id === sortColumn);

    if (!columnWithIndex) return data;

    return [...data].sort((a, b) => {
      const comparison = compareValues(
        getRawValue(a, columnWithIndex.column),
        getRawValue(b, columnWithIndex.column)
      );

      return sortDir === "asc" ? comparison : -comparison;
    });
  }, [columns, data, sortColumn, sortDir]);

  /* ---- Pagination ---- */
  const totalPages = paginated ? Math.max(1, Math.ceil(sortedData.length / safePageSize)) : 1;
  const activePage = Math.min(Math.max(currentPage, 1), totalPages);
  const pageStartIndex = paginated ? (activePage - 1) * safePageSize : 0;
  const displayData = paginated
    ? sortedData.slice(pageStartIndex, pageStartIndex + safePageSize)
    : sortedData;

  /* ---- Selection handlers ---- */
  const displayRowKeys = useMemo(
    () => displayData.map((row, rowIndex) => resolveRowKey(row, pageStartIndex + rowIndex)),
    [displayData, pageStartIndex, resolveRowKey]
  );

  const allRowsSelected =
    displayRowKeys.length > 0 && displayRowKeys.every((key) => selected.has(key));

  const toggleRow = useCallback(
    (key: DataTableRowKey) => {
      const next = new Set(selected);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      setSelected(next);
    },
    [selected, setSelected]
  );

  const toggleAll = useCallback(() => {
    if (displayRowKeys.length === 0) return;

    if (allRowsSelected) {
      const next = new Set(selected);
      displayRowKeys.forEach((key) => next.delete(key));
      setSelected(next);
    } else {
      setSelected(new Set([...selected, ...displayRowKeys]));
    }
  }, [allRowsSelected, displayRowKeys, selected, setSelected]);

  /* ---- Cell value resolver ---- */
  const getCellValue = useCallback((row: T, column: ColumnDef<T>): React.ReactNode => {
    const raw = getRawValue(row, column);
    if (column.render) return column.render(raw, row);
    return renderFallbackCell(raw);
  }, []);

  /* ---- Density / telemetry footer ---- */
  const cellPad = dense
    ? `${tokens.spacing.xs} ${tokens.spacing.sm}`
    : `${tokens.spacing.sm} ${tokens.spacing.md}`;

  const totalItems = sortedData.length;
  const firstItem = totalItems === 0 ? 0 : pageStartIndex + 1;
  const lastItem = paginated
    ? Math.min(pageStartIndex + displayData.length, totalItems)
    : totalItems;

  const footerText = `Showing ${firstItem}-${lastItem} of ${totalItems} items`;

  return (
    <div
      className={cn("flex flex-col overflow-hidden", className)}
      style={{
        width: "100%",
        border: `1px solid ${tokens.colors.border.default}`,
        borderRadius: tokens.borderRadius.sm,
        backgroundColor: tokens.colors.bg.surface,
      }}
    >
      {/* Table wrapper */}
      <div style={{ overflowX: "auto", width: "100%", flex: "1 1 auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            fontFamily: tokens.typography.fontFamily.sans,
            fontSize: tokens.typography.fontSize.sm,
          }}
          role="grid"
        >
          <thead
            style={{
              position: stickyHeader ? "sticky" : "static",
              top: 0,
              zIndex: 1,
            }}
          >
            <tr
              style={{
                borderBottom: `1px solid ${tokens.colors.border.default}`,
                backgroundColor: tokens.colors.bg.deep,
              }}
            >
              {selectable && (
                <th
                  scope="col"
                  style={{
                    padding: cellPad,
                    width: "40px",
                    textAlign: "center",
                    borderBottom: `1px solid ${tokens.colors.border.default}`,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={allRowsSelected}
                    onChange={toggleAll}
                    style={{ accentColor: tokens.colors.brand.primary, cursor: "pointer" }}
                    aria-label="Select all rows"
                  />
                </th>
              )}

              {columns.map((column, index) => {
                const columnId = getColumnId(column, index);
                const isSorted = sortColumn === columnId;
                const ariaSort = isSorted
                  ? sortDir === "asc"
                    ? "ascending"
                    : sortDir === "desc"
                      ? "descending"
                      : "none"
                  : undefined;

                return (
                  <th
                    key={columnId}
                    scope="col"
                    style={{
                      padding: cellPad,
                      fontSize: tokens.typography.fontSize.xs,
                      fontWeight: tokens.typography.fontWeight.bold,
                      color: tokens.colors.text.secondary,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      width: column.width,
                      textAlign: column.align ?? "left",
                      cursor: column.sortable ? "pointer" : "default",
                      userSelect: "none",
                      whiteSpace: "nowrap",
                      borderBottom: `1px solid ${tokens.colors.border.default}`,
                    }}
                    onClick={column.sortable ? () => handleSort(columnId) : undefined}
                    aria-sort={ariaSort}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: tokens.spacing.xs,
                      }}
                    >
                      {column.header}
                      {column.sortable && (
                        <span style={{ display: "inline-flex", color: tokens.colors.text.muted }}>
                          {isSorted ? (
                            sortDir === "asc" ? (
                              <ChevronUp size={12} />
                            ) : sortDir === "desc" ? (
                              <ChevronDown size={12} />
                            ) : (
                              <ChevronsUpDown size={12} />
                            )
                          ) : (
                            <ChevronsUpDown size={12} />
                          )}
                        </span>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  style={{
                    padding: tokens.spacing.xl,
                    textAlign: "center",
                    color: tokens.colors.text.muted,
                  }}
                >
                  {loadingMessage}
                </td>
              </tr>
            ) : displayData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  style={{
                    padding: tokens.spacing.xl,
                    textAlign: "center",
                    color: tokens.colors.text.muted,
                  }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              displayData.map((row, rowIndex) => {
                const key = displayRowKeys[rowIndex] ?? pageStartIndex + rowIndex;
                const isSelected = selected.has(key);

                return (
                  <tr
                    key={key}
                    style={{
                      borderBottom: `1px solid ${tokens.colors.border.subtle}`,
                      transition: tokens.transitions.fast,
                      backgroundColor: isSelected ? tokens.colors.bg.active : "transparent",
                    }}
                    onMouseEnter={(event) => {
                      if (!isSelected)
                        event.currentTarget.style.backgroundColor = tokens.colors.bg.hover;
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.backgroundColor = isSelected
                        ? tokens.colors.bg.active
                        : "transparent";
                    }}
                  >
                    {selectable && (
                      <td style={{ padding: cellPad, textAlign: "center" }}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRow(key)}
                          style={{ accentColor: tokens.colors.brand.primary, cursor: "pointer" }}
                          aria-label={`Select row ${key}`}
                        />
                      </td>
                    )}

                    {columns.map((column, columnIndex) => {
                      const columnId = getColumnId(column, columnIndex);

                      return (
                        <td
                          key={columnId}
                          style={{
                            padding: cellPad,
                            fontSize: tokens.typography.fontSize.sm,
                            color: tokens.colors.text.primary,
                            fontFamily: column.mono ? tokens.typography.fontFamily.mono : undefined,
                            textAlign: column.align ?? "left",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {getCellValue(row, column)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {showFooter && (
        <div
          style={{
            padding: tokens.spacing.sm,
            borderTop: `1px solid ${tokens.colors.border.default}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: tokens.colors.bg.deep,
            gap: tokens.spacing.md,
          }}
        >
          <span
            style={{ fontSize: tokens.typography.fontSize.xs, color: tokens.colors.text.muted }}
          >
            {footerText}
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: tokens.spacing.xs }}>
            {paginated && totalPages > 1 && (
              <PaginationButton
                ariaLabel="First page"
                disabled={activePage <= 1}
                onClick={() => setCurrentPage(1)}
              >
                <ChevronsLeft size={16} />
              </PaginationButton>
            )}

            <PaginationButton
              ariaLabel="Previous Page"
              disabled={!paginated || activePage <= 1}
              onClick={() => setCurrentPage(Math.max(1, activePage - 1))}
            >
              <ChevronLeft size={16} />
            </PaginationButton>

            {paginated && totalPages > 1 && (
              <span
                style={{
                  minWidth: "3.5rem",
                  textAlign: "center",
                  fontSize: tokens.typography.fontSize.xs,
                  color: tokens.colors.text.secondary,
                  fontFamily: tokens.typography.fontFamily.mono,
                }}
              >
                {activePage}/{totalPages}
              </span>
            )}

            <PaginationButton
              ariaLabel="Next Page"
              disabled={!paginated || activePage >= totalPages}
              onClick={() => setCurrentPage(Math.min(totalPages, activePage + 1))}
            >
              <ChevronRight size={16} />
            </PaginationButton>

            {paginated && totalPages > 1 && (
              <PaginationButton
                ariaLabel="Last page"
                disabled={activePage >= totalPages}
                onClick={() => setCurrentPage(totalPages)}
              >
                <ChevronsRight size={16} />
              </PaginationButton>
            )}
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
      style={{
        padding: "2px 6px",
        background: "none",
        border: "none",
        color: disabled ? tokens.colors.text.disabled : tokens.colors.text.secondary,
        cursor: disabled ? "not-allowed" : "pointer",
        borderRadius: tokens.borderRadius.sm,
        transition: tokens.transitions.fast,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </button>
  );
}
