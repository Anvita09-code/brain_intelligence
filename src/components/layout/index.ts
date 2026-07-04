/**
 * IOB Layout Components – Barrel Export (Phase 2 – Section 12)
 *
 * Structural primitives, app shell, and application layout chrome.
 *
 * App-level layout (used by app/(dashboard)/layout.tsx):
 *   - Navbar
 *   - Sidebar
 *   - Footer
 *
 * Structural primitives:
 *   - Container, Section, Flex, Stack, Grid, Divider, Spacer
 *     from './Structural'
 *
 * Shell wrappers:
 *   - PageHeader, ContentWrapper, DashboardWrapper
 *     from './Shell'
 *
 * Legacy:
 *   NavigationSidebar / NavigationNavbar are generic, prop-driven
 *   shells from './Navigation' – exported with aliases to avoid
 *   colliding with the app-level Navbar/Sidebar above.
 */

export * from './Structural';
export * from './Shell';
export * from './Navbar';
export * from './Sidebar';
export * from './Footer';

// Legacy / generic navigation shells – aliased to prevent name collisions
export {
  Sidebar as NavigationSidebar,
  Navbar as NavigationNavbar,
} from './Navigation';
