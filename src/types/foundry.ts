/**
 * HCL Volt MX Foundry Type Definitions
 * Auto-generated from Swagger API documentation
 */

/**
 * Contact entity from Salesforce (SF-MQ-Leona service)
 * Represents mentor/contact information
 */
export interface Contact {
  Id: string;
  Name: string;
  FirstName?: string;
  LastName?: string;
  Email?: string;
  Phone?: string;
  MobilePhone?: string;
  Title?: string;
  Department?: string;
  AccountId?: string;
  PhotoUrl?: string;
  Description?: string;
  Languages__c?: string;
  Level__c?: string;

  // Address fields
  MailingStreet?: string;
  MailingCity?: string;
  MailingState?: string;
  MailingPostalCode?: string;
  MailingCountry?: string;
  MailingAddress?: string;
  MailingLatitude?: number;
  MailingLongitude?: number;
  MailingGeocodeAccuracy?: string;

  // Other address
  OtherStreet?: string;
  OtherCity?: string;
  OtherState?: string;
  OtherPostalCode?: string;
  OtherCountry?: string;
  OtherAddress?: string;
  OtherLatitude?: number;
  OtherLongitude?: number;
  OtherGeocodeAccuracy?: string;

  // Additional contact info
  HomePhone?: string;
  OtherPhone?: string;
  Fax?: string;
  AssistantName?: string;
  AssistantPhone?: string;

  // Relationship fields
  ReportsToId?: string;
  OwnerId?: string;

  // Lead information
  LeadSource?: string;

  // System fields
  CreatedDate?: string;
  CreatedById?: string;
  LastModifiedDate?: string;
  LastModifiedById?: string;
  LastViewedDate?: string;
  LastReferencedDate?: string;
  LastActivityDate?: string;
  SystemModstamp?: string;

  // Status fields
  IsDeleted?: boolean;
  MasterRecordId?: string;
  IsEmailBounced?: boolean;
  EmailBouncedDate?: string;
  EmailBouncedReason?: string;

  // Data quality
  Jigsaw?: string;
  JigsawContactId?: string;
  CleanStatus?: string;
  LastCURequestDate?: string;
  LastCUUpdateDate?: string;

  // Birthdate
  Birthdate?: string;

  // Salutation
  Salutation?: string;
}

/**
 * Response structure for Contact_get operation
 */
export interface ContactResponse {
  opstatus: number;
  httpStatusCode: number;
  Contact?: Contact[];
}
