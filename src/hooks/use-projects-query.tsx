import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type Project = {
  id: string;
  author: string;
  image: string;
  handle: string;
  websiteUrl: string;
  tweetUrl: string;
  videoUrl: string;
  votes: number;
  created_at: string;
  flagged: boolean;
};

export const useProjectsQuery = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('flagged', false) // Only fetch non-flagged projects
        .order('votes', { ascending: false });
      
      if (error) {
        console.error('Error fetching projects:', error);
        throw new Error(error.message);
      }
      
      // Map the database column names to our frontend property names
      return data.map(project => ({
        id: project.id,
        author: project.author,
        image: project.image,
        handle: project.handle,
        websiteUrl: project.websiteurl, // Map from websiteurl to websiteUrl
        tweetUrl: project.tweeturl,     // Map from tweeturl to tweetUrl
        videoUrl: project.videourl,     // Map from videourl to videoUrl
        votes: project.votes,
        created_at: project.created_at,
        flagged: project.flagged
      })) as Project[];
    },
    refetchInterval: 60000, // Poll every minute (60,000 ms)
    refetchOnWindowFocus: true,
  });
};