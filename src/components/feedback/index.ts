/**
 * IOB Feedback Components – Barrel Export (Phase 2 – Section 12)
 *
 * Dialogs, toasts, banners, and error boundaries.
 */

export {
  Dialog,
  ConfirmDialog,
  Modal,
  type DialogProps,
  type ConfirmDialogProps,
  type DialogSize,
  type DialogVariant,
  type ModalProps,
} from './Dialogs';

export {
  ErrorBoundary,
  ErrorBoundaryUI,
  ErrorFallback,
  type ErrorBoundaryProps,
  type ErrorFallbackProps,
} from './ErrorBoundaries';

export {
  Toast,
  ToastContainer,
  Banner,
  AlertBanner,
  type ToastProps,
  type ToastContainerProps,
  type BannerProps,
  type AlertBannerProps,
  type FeedbackType,
} from './FeedbackOverlays';

// Loader – used by src/app/loading.tsx
// Exported here for completeness of the feedback barrel.
export {
  default as Loader,
  Loader as LoaderComponent,
  type LoaderProps,
} from './Loader';

// Legacy ErrorBoundary (src/components/feedback/ErrorBoundary.tsx)
// Kept for backward compatibility – aliased to avoid colliding with
// the ErrorBoundary export from ErrorBoundaries.tsx above.
export { default as LegacyErrorBoundary } from './ErrorBoundary';
