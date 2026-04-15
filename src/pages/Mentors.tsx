/**
 * Mentors Page
 *
 * Displays mentor information from Salesforce through HCL Volt MX Foundry
 * Uses the SF-MQ-Leona Integration Service to fetch Contact data
 */

import React, { useState } from 'react';
import { Users as UsersIcon, Mail, Phone, MapPin, Briefcase, RefreshCw, AlertCircle } from 'lucide-react';
import { useMentors } from '../hooks/useMentors';
import type { Contact } from '../types/foundry';

const Mentors: React.FC = () => {
  const { mentors, isLoading, error, refetch } = useMentors();
  const [selectedMentor, setSelectedMentor] = useState<Contact | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleViewDetails = (mentor: Contact) => {
    setSelectedMentor(selectedMentor?.Id === mentor.Id ? null : mentor);
  };

  // Calculate statistics
  const totalMentors = mentors.length;
  const mentorsWithEmail = mentors.filter(m => m.Email).length;
  const mentorsWithPhone = mentors.filter(m => m.Phone || m.MobilePhone).length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Mentors</h1>
          <p className="text-neutral-600">
            View and connect with mentors from Salesforce via HCL Volt MX Foundry
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="btn-primary flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Error Loading Mentors</h3>
              <p className="text-sm text-red-700">{error.message}</p>
              <p className="text-xs text-red-600 mt-2">
                Please check your Foundry configuration in the .env file and ensure your App Key and
                App Secret are correct.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary-50 text-primary-700 rounded-lg">
              <UsersIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Mentors</p>
              <p className="text-2xl font-bold text-neutral-900">{totalMentors}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-lg">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">With Email</p>
              <p className="text-2xl font-bold text-neutral-900">{mentorsWithEmail}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 text-green-700 rounded-lg">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">With Phone</p>
              <p className="text-2xl font-bold text-neutral-900">{mentorsWithPhone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && !error && (
        <div className="card">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-primary-600 mx-auto mb-4 animate-spin" />
              <p className="text-neutral-600">Loading mentors from Foundry...</p>
            </div>
          </div>
        </div>
      )}

      {/* Mentors List */}
      {!isLoading && !error && (
        <div className="card">
          {mentors.length === 0 ? (
            <div className="text-center py-12">
              <UsersIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600 mb-2">No mentors found</p>
              <p className="text-sm text-neutral-500">
                Check your Foundry service configuration or try refreshing
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {mentors.map((mentor) => (
                <div
                  key={mentor.Id}
                  className="border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors"
                >
                  {/* Mentor Card Header */}
                  <div
                    onClick={() => handleViewDetails(mentor)}
                    className="p-4 cursor-pointer hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                          {mentor.Name || `${mentor.FirstName} ${mentor.LastName}`.trim() || 'Unknown'}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                          {mentor.Title && (
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              <span>{mentor.Title}</span>
                            </div>
                          )}
                          {mentor.Department && (
                            <span className="badge badge-neutral">{mentor.Department}</span>
                          )}
                          {mentor.Level__c && (
                            <span className="badge badge-green">{mentor.Level__c}</span>
                          )}
                        </div>
                      </div>
                      <button
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(mentor);
                        }}
                      >
                        {selectedMentor?.Id === mentor.Id ? 'Hide Details' : 'View Details'}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedMentor?.Id === mentor.Id && (
                    <div className="border-t border-neutral-200 p-4 bg-neutral-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Contact Information */}
                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-3">Contact Information</h4>
                          <div className="space-y-2 text-sm">
                            {mentor.Email && (
                              <div className="flex items-start gap-2">
                                <Mail className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                                <a
                                  href={`mailto:${mentor.Email}`}
                                  className="text-primary-600 hover:text-primary-700 break-all"
                                >
                                  {mentor.Email}
                                </a>
                              </div>
                            )}
                            {mentor.Phone && (
                              <div className="flex items-start gap-2">
                                <Phone className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                                <a
                                  href={`tel:${mentor.Phone}`}
                                  className="text-primary-600 hover:text-primary-700"
                                >
                                  {mentor.Phone} (Office)
                                </a>
                              </div>
                            )}
                            {mentor.MobilePhone && (
                              <div className="flex items-start gap-2">
                                <Phone className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                                <a
                                  href={`tel:${mentor.MobilePhone}`}
                                  className="text-primary-600 hover:text-primary-700"
                                >
                                  {mentor.MobilePhone} (Mobile)
                                </a>
                              </div>
                            )}
                            {!mentor.Email && !mentor.Phone && !mentor.MobilePhone && (
                              <p className="text-neutral-500 italic">No contact information available</p>
                            )}
                          </div>
                        </div>

                        {/* Additional Details */}
                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-3">Additional Details</h4>
                          <div className="space-y-2 text-sm">
                            {mentor.Languages__c && (
                              <div>
                                <span className="font-medium text-neutral-700">Languages:</span>
                                <span className="text-neutral-600 ml-2">{mentor.Languages__c}</span>
                              </div>
                            )}
                            {(mentor.MailingCity || mentor.MailingState || mentor.MailingCountry) && (
                              <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                                <span className="text-neutral-600">
                                  {[mentor.MailingCity, mentor.MailingState, mentor.MailingCountry]
                                    .filter(Boolean)
                                    .join(', ')}
                                </span>
                              </div>
                            )}
                            {mentor.Description && (
                              <div>
                                <span className="font-medium text-neutral-700">Description:</span>
                                <p className="text-neutral-600 mt-1">{mentor.Description}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Mentors;
