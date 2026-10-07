/**
 * Image service for animal photography.
 * Fetches verified public images from Wikipedia and Wikimedia Commons API.
 * Falls back to high-resolution Unsplash nature collections.
 */

interface WikiImageResult {
  imageUrl: string;
  imageCaption: string;
  galleryImages: { url: string; title: string; source: string }[];
}

// Curated high quality animal fallbacks
const FALLBACK_ANIMAL_IMAGES: Record<string, string> = {
  lion: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80',
  tiger: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
  elephant: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80',
  whale: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1200&q=80',
  dolphin: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1200&q=80',
  eagle: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?auto=format&fit=crop&w=1200&q=80',
  wolf: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?auto=format&fit=crop&w=1200&q=80',
  penguin: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=1200&q=80',
  panda: 'https://images.unsplash.com/photo-1527118732049-c88155f2107c?auto=format&fit=crop&w=1200&q=80',
  cheetah: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1200&q=80',
  shark: 'https://images.unsplash.com/photo-1560275619-4ccb1e344f80?auto=format&fit=crop&w=1200&q=80',
  fox: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=1200&q=80',
  bear: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=1200&q=80',
  default: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1200&q=80',
};

export async function fetchAnimalImages(
  scientificName: string,
  englishName: string,
  vietnameseName: string
): Promise<WikiImageResult> {
  const queriesToTry = [
    scientificName,
    englishName,
    vietnameseName,
  ].filter(Boolean);

  // 1. Try English Wikipedia REST API for the primary thumbnail and image
  for (const query of queriesToTry) {
    try {
      const cleanQuery = query.replace(/[()]/g, '').trim();
      const encoded = encodeURIComponent(cleanQuery);
      
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`,
        { headers: { 'Accept': 'application/json' } }
      );

      if (res.ok) {
        const data = await res.json();
        if (data.originalimage?.source || data.thumbnail?.source) {
          const mainImg = data.originalimage?.source || data.thumbnail?.source;
          const caption = data.description || `${vietnameseName} (${scientificName})`;

          // Now fetch a few related gallery images from Wikimedia Commons
          const gallery = await fetchCommonsGallery(scientificName || englishName);

          return {
            imageUrl: mainImg,
            imageCaption: caption,
            galleryImages: gallery.length > 0 ? gallery : [
              { url: mainImg, title: vietnameseName, source: 'Wikipedia' }
            ],
          };
        }
      }
    } catch {
      // Continue to next query
    }
  }

  // 2. Try Wikimedia Commons search
  try {
    const commonsGallery = await fetchCommonsGallery(scientificName || englishName || vietnameseName);
    if (commonsGallery.length > 0) {
      return {
        imageUrl: commonsGallery[0].url,
        imageCaption: commonsGallery[0].title,
        galleryImages: commonsGallery,
      };
    }
  } catch {
    // ignore
  }

  // 3. Fallback to curated Unsplash photography
  const lowerEn = englishName.toLowerCase();
  let fallbackUrl = FALLBACK_ANIMAL_IMAGES.default;
  for (const [key, url] of Object.entries(FALLBACK_ANIMAL_IMAGES)) {
    if (lowerEn.includes(key)) {
      fallbackUrl = url;
      break;
    }
  }

  return {
    imageUrl: fallbackUrl,
    imageCaption: `${vietnameseName} (${scientificName})`,
    galleryImages: [
      { url: fallbackUrl, title: vietnameseName, source: 'Unsplash Wildlife' }
    ]
  };
}

async function fetchCommonsGallery(searchTerm: string): Promise<{ url: string; title: string; source: string }[]> {
  try {
    const encoded = encodeURIComponent(searchTerm);
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrsearch=${encoded}+filetype:bitmap&gsrlimit=6&prop=pageimages|imageinfo&pithumbsize=1000&iiprop=url`;
    
    const res = await fetch(url);
    if (!res.ok) return [];
    
    const data = await res.json();
    const pages = data.query?.pages;
    if (!pages) return [];

    const results: { url: string; title: string; source: string }[] = [];
    for (const pageId of Object.keys(pages)) {
      const page = pages[pageId];
      const imgUrl = page.thumbnail?.source || page.imageinfo?.[0]?.url;
      if (imgUrl && !imgUrl.endsWith('.svg') && !imgUrl.endsWith('.ogg')) {
        results.push({
          url: imgUrl,
          title: page.title?.replace('File:', '').replace(/\.[^/.]+$/, '') || searchTerm,
          source: 'Wikimedia Commons'
        });
      }
    }
    return results;
  } catch {
    return [];
  }
}
