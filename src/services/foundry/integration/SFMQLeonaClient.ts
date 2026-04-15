/**
 * SF-MQ-Leona Integration Service Client
 *
 * Generated from Foundry Swagger export
 * Service: SF-MQ-Leona
 * Host: dsta-dev.demo-hclvoltmx.net/services
 * BasePath: /SF-MQ-Leona
 *
 * This client provides access to Salesforce Contact and Account data
 * through HCL Volt MX Foundry Integration Services.
 */

import { foundryConfig } from '../../../config/foundry.config';
import type { ContactResponse } from '../../../types/foundry';

/**
 * SF-MQ-Leona Integration Service Client
 * Provides methods for accessing Salesforce data through Foundry
 */
export class SFMQLeonaClient {
  private serviceHost: string;
  private servicePath: string;

  constructor() {
    // Use environment variable for host (enables dev/staging/prod switching)
    this.serviceHost = foundryConfig.serviceHost;

    // Service path from Swagger basePath
    this.servicePath = '/SF-MQ-Leona';
  }

  /**
   * Get Contacts (Mentors)
   *
   * Endpoint: GET /SF-MQ-Leona/Contact_get
   * Returns a list of contacts from Salesforce
   *
   * @returns Promise<ContactResponse> Contact data
   */
  async getContacts(): Promise<ContactResponse> {
    const endpoint = '/Contact_get';

    const response = await fetch(`https://${this.serviceHost}${this.servicePath}${endpoint}`, {
      method: 'GET',
      headers: {
        'X-Voltmx-App-Key': foundryConfig.appKey,
        'X-Voltmx-App-Secret': foundryConfig.appSecret,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch contacts (${response.status}): ${errorText}`);
    }

    return response.json();
  }

  /**
   * Get Account information
   *
   * Endpoint: GET /SF-MQ-Leona/Account_get
   * Returns a list of accounts from Salesforce
   *
   * @returns Promise<any> Account data
   */
  async getAccounts(): Promise<any> {
    const endpoint = '/Account_get';

    const response = await fetch(`https://${this.serviceHost}${this.servicePath}${endpoint}`, {
      method: 'GET',
      headers: {
        'X-Voltmx-App-Key': foundryConfig.appKey,
        'X-Voltmx-App-Secret': foundryConfig.appSecret,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch accounts (${response.status}): ${errorText}`);
    }

    return response.json();
  }

  /**
   * Update Account
   *
   * Endpoint: POST /SF-MQ-Leona/Account_update
   * Updates an account in Salesforce
   *
   * @param accountData Account data to update
   * @returns Promise<any> Update response
   */
  async updateAccount(accountData: any): Promise<any> {
    const endpoint = '/Account_update';

    const response = await fetch(`https://${this.serviceHost}${this.servicePath}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Voltmx-App-Key': foundryConfig.appKey,
        'X-Voltmx-App-Secret': foundryConfig.appSecret,
      },
      body: JSON.stringify(accountData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update account (${response.status}): ${errorText}`);
    }

    return response.json();
  }
}

// Export a singleton instance for convenience
export const sfMQLeonaClient = new SFMQLeonaClient();
