const API_KEY = 'live_Z5F66y6qzfPIjuAyKb1Nz5mPP7UnDOKms3EyA35LEPa8JOygwTiOPtPTVkytpfta';

export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
}

export const isCat = (obj: unknown): obj is Cat => {
  return obj != null && typeof obj === 'object'
    && 'id' in obj && typeof obj.id === 'string'
    && 'url' in obj && typeof obj.url === 'string'
    && 'width' in obj && typeof obj.width === 'number'
    && 'height' in obj && typeof obj.height === 'number';
}

export const isCatArray = (obj: unknown): obj is Cat[] => {
  return Array.isArray(obj) && obj.every(x => isCat(x));
}

export const fetchRandomCat = async (): Promise<Cat> => {
  const response = await fetch('https://api.thecatapi.com/v1/images/search', {
    headers: [['x-api-key', API_KEY]]
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  if (!isCatArray(data) || data.length < 1) {
    throw new Error('Bad response from API');
  }
  return data[0];
}
