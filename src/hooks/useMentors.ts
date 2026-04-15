/**
 * React Hook for Mentor/Contact Data
 *
 * Provides access to mentor information from Salesforce through Foundry
 */

import { useState, useEffect } from 'react';
import { sfMQLeonaClient } from '../services/foundry/integration/SFMQLeonaClient';
import type { Contact } from '../types/foundry';

interface UseMentorsResult {
  mentors: Contact[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch and manage mentor data from Foundry
 *
 * @returns {UseMentorsResult} Mentor data, loading state, error, and refetch function
 *
 * @example
 * ```tsx
 * function MentorsList() {
 *   const { mentors, isLoading, error, refetch } = useMentors();
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <div>
 *       {mentors.map(mentor => (
 *         <div key={mentor.Id}>{mentor.Name}</div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useMentors(): UseMentorsResult {
  const [mentors, setMentors] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMentors = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await sfMQLeonaClient.getContacts();

      // Extract contacts from response
      if (response.Contact && Array.isArray(response.Contact)) {
        setMentors(response.Contact);
      } else {
        setMentors([]);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch mentors');
      setError(error);
      console.error('Error fetching mentors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch mentors on mount
  useEffect(() => {
    fetchMentors();
  }, []);

  return {
    mentors,
    isLoading,
    error,
    refetch: fetchMentors,
  };
}
