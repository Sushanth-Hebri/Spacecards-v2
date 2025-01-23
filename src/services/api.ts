import axios from 'axios';

const SPACE_API_URL = 'https://api.spaceflightnewsapi.net/v4/articles';
const CONTENT_API_URL = 'https://content-api-seven.vercel.app/api/content';

export interface Flashcard {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  videoUrl?: string;
  publishedAt: string;
  source: string;
  readTime: string;
  category: string;
}

export interface MixContent {
  id: string;
  type: 'article' | 'video' | 'song' | 'image' | 'text';
  title?: string;
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  author?: string;
  publishedAt: string;
  likes?: number;
  tags: string[];
}

export const fetchFlashcards = async (): Promise<Flashcard[]> => {
  try {
    const { data } = await axios.get(SPACE_API_URL);
    return data.results
      .map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        content: item.summary,
        imageUrl: item.image_url,
        videoUrl: item.video_url || null,
        publishedAt: new Date(item.published_at).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        source: item.news_site || 'Space News',
        readTime: `${Math.ceil(item.summary.split(' ').length / 200)} min read`,
        category: getCategory(item.title),
      }))
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    return [];
  }
};

export const fetchMixContent = async (): Promise<MixContent[]> => {
  try {
    const { data } = await axios.get(CONTENT_API_URL);
    return data.content
      .map((item: any) => ({
        id: item.id,
        type: item.content.type,
        title: item.content.title || '',
        content: item.content.content || '',
        imageUrl: item.content.imageUrl || '',
        videoUrl: item.content.videoUrl || '',
        audioUrl: item.content.audioUrl || '',
        author: item.content.author || '',
        publishedAt: new Date(item.content.publishedAt).toLocaleString(
          'en-US',
          {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }
        ),
        likes: item.content.likes || 0,
        tags: item.content.tags || [],
      }))
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  } catch (error) {
    console.error('Error fetching mix content:', error);
    return [];
  }
};

function getCategory(title: string): string {
  const categories = {
    NASA: ['nasa', 'space station', 'astronaut'],
    SpaceX: ['spacex', 'falcon', 'starship'],
    Astronomy: ['star', 'galaxy', 'telescope', 'planet'],
    Technology: ['satellite', 'rocket', 'launch'],
    Discovery: ['discover', 'found', 'new'],
  };

  const lowercaseTitle = title.toLowerCase();
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some((keyword) => lowercaseTitle.includes(keyword))) {
      return category;
    }
  }
  return 'General';
}
