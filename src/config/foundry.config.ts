/**
 * HCL Volt MX Foundry Configuration
 *
 * This configuration file manages connection details for Foundry services.
 * Environment variables allow switching between dev/staging/prod environments.
 */

export interface FoundryConfig {
  serviceHost: string;
  appKey: string;
  appSecret: string;
}

export const foundryConfig: FoundryConfig = {
  serviceHost: import.meta.env.VITE_FOUNDRY_SERVICE_HOST || '',
  appKey: import.meta.env.VITE_FOUNDRY_APP_KEY || '',
  appSecret: import.meta.env.VITE_FOUNDRY_APP_SECRET || '',
};

/**
 * Validates that all required Foundry configuration is present
 * Call this at application startup to fail fast if config is missing
 */
export function validateFoundryConfig(): void {
  const missing: string[] = [];

  if (!foundryConfig.serviceHost) missing.push('VITE_FOUNDRY_SERVICE_HOST');
  if (!foundryConfig.appKey) missing.push('VITE_FOUNDRY_APP_KEY');
  if (!foundryConfig.appSecret) missing.push('VITE_FOUNDRY_APP_SECRET');

  if (missing.length > 0) {
    throw new Error(
      `Missing required Foundry configuration: ${missing.join(', ')}. ` +
      'Please check your .env file.'
    );
  }
}
