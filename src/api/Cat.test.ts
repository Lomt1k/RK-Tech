import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { fetchRandomCat, isCat, isCatArray, type Cat } from './Cat';

const mockCat: Cat = {
  id: 'test-id',
  url: 'https://example.com/cat.jpg',
  width: 500,
  height: 400
};

describe('API Type Guards', () => {
  it('Корректно идентифицирует объект Cat', () => {
    expect(isCat(mockCat)).toBe(true);
    expect(isCat({ ...mockCat, id: 123 })).toBe(false);
    expect(isCat({ ...mockCat, url: null })).toBe(false);
    expect(isCat(null)).toBe(false);
    expect(isCat(undefined)).toBe(false);
    expect(isCat('not a cat')).toBe(false);
  });

  it('Корректно идентифицирует массив Cat[]', () => {
    expect(isCatArray([mockCat])).toBe(true);
    expect(isCatArray([{ ...mockCat, width: 'not a number' }])).toBe(false);
    expect(isCatArray([])).toBe(true); // пустой массив считается валидным
    expect(isCatArray(null)).toBe(false);
    expect(isCatArray({})).toBe(false);
  });
});

describe('fetchRandomCat', () => {
  beforeAll(() => {
    globalThis.fetch = vi.fn();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('Возвращает корректный объект Cat при успешном ответе', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => [mockCat],
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as Response);

    const result = await fetchRandomCat();
    expect(result).toEqual(mockCat);
    expect(fetch).toHaveBeenCalledWith('https://api.thecatapi.com/v1/images/search', {
      headers: [['x-api-key', expect.any(String)]]
    });
  });

  it('Выбрасывает ошибку при не ok ответе', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: 'Server Error',
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as Response);

    await expect(fetchRandomCat()).rejects.toThrow('500 Server Error');
  });

  it('Выбрасывает ошибку когда от API приходят некорректные данные', async () => {
    const testCases = [
      { response: [{ id: '1', url: 'test.jpg' }] }, // не полностью заполненный объект
      { response: {} }, // не массив
      { response: [{}] }, // пустой объект в массиве
      { response: null },
    ];

    for (const testCase of testCases) {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => testCase.response,
      };
      vi.mocked(fetch).mockResolvedValue(mockResponse as Response);
      await expect(fetchRandomCat()).rejects.toThrow('Bad response from API');
    }
  });
  
});