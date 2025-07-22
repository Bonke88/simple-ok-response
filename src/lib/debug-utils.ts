
/**
 * Debug utilities for troubleshooting React Router and other issues
 */

/**
 * Log route changes to help debug routing issues
 * @param location - The current location object from react-router
 */
export const logRouteChange = (location: { pathname: string; search: string; hash: string }) => {
  console.log(`Route changed to: ${location.pathname}${location.search}${location.hash}`);
};

/**
 * Log authentication status to help debug auth issues
 * @param isAuthenticated - Boolean indicating if user is authenticated
 * @param userId - Optional user ID
 */
export const logAuthStatus = (isAuthenticated: boolean, userId?: string) => {
  console.log(`Auth status: ${isAuthenticated ? 'Authenticated' : 'Not authenticated'}${userId ? `, User ID: ${userId}` : ''}`);
};

/**
 * Utility to help debug 404 issues by logging when NotFound component renders
 */
export const logNotFoundRender = () => {
  console.error('NotFound component rendered - 404 error occurred');
  console.trace('Stack trace for NotFound render:');
};
