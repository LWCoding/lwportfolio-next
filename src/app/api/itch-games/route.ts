import { NextResponse } from 'next/server';

interface ItchGame {
  published?: boolean;
  published_at?: string | null;
  classification?: string;
}

export async function GET() {
  const apiKey = process.env.ITCH_API_KEY;

  if (!apiKey) {
    console.error('ITCH_API_KEY not found in environment variables');
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    // Use the my-games endpoint to fetch all your games with view counts
    const response = await fetch(`https://itch.io/api/1/${apiKey}/my-games`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data
    });

    if (!response.ok) {
      console.error('Itch.io API responded with status:', response.status);
      const errorText = await response.text();
      console.error('Itch.io API error response:', errorText);
      
      return NextResponse.json(
        { error: 'Failed to fetch from Itch.io API', status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Filter out non-public games (since we're using curated selection)
    if (data.games && Array.isArray(data.games)) {
      // Filter out games that aren't published/public
      const publicGames = data.games.filter((game: ItchGame) => {
        return game.published === true || 
               game.published_at !== null || 
               (game.classification !== 'draft' && game.classification !== 'restricted');
      });
      
      data.games = publicGames;
      
      // Log successful response for debugging in development
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Successfully fetched game data from Itch.io');
        console.log(`📊 Found ${data.games.length} games`);
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Itch.io games:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
