import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import CatsSection from './CatsSection';
import { Cat, fetchRandomCat } from '../../api/Cat';

vi.mock('../../api/Cat', () => ({
  fetchRandomCat: vi.fn(),
}));

const mockCat: Cat = {
  id: '123',
  url: 'https://example.com/cat.jpg',
  width: 500,
  height: 500,
};

describe('CatsSection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    (fetchRandomCat as Mock).mockResolvedValue(mockCat);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('Корректно отрисовывает изначальное состояние', () => {
    render(<CatsSection />);

    expect(screen.getByLabelText('Enabled')).toBeChecked();
    expect(screen.getByLabelText('Auto-refresh every 5 seconds')).not.toBeChecked();
    expect(screen.getByRole('button', { name: 'Get cat' })).toBeInTheDocument();
  });

  it('Отключает содержимое когда чекбокс "Enabled" отжат', async () => {
    render(<CatsSection />);

    const enabledCheckbox = screen.getByLabelText('Enabled');
    fireEvent.click(enabledCheckbox);

    expect(enabledCheckbox).not.toBeChecked();
    expect(screen.queryByRole('button', { name: 'Get cat' })).not.toBeInTheDocument();
  });

  it('Подгружает и отрисовывает картинку при нажатии кнопки', async () => {
    render(<CatsSection />);

    const button = screen.getByRole('button', { name: 'Get cat' });
    fireEvent.click(button);

    await act(() => vi.advanceTimersByTime(100));

    expect(fetchRandomCat).toHaveBeenCalledTimes(1);
    expect(screen.getByAltText('Random cat image')).toBeInTheDocument();
    expect(screen.getByAltText('Random cat image')).toHaveAttribute('src', mockCat.url);
  });

  it('Отображает сообщение по ошибке если не удалось подгрузить картинку', async () => {
    (fetchRandomCat as Mock).mockRejectedValue(new Error('API error'));

    render(<CatsSection />);
    fireEvent.click(screen.getByRole('button', { name: 'Get cat' }));

    await act(() => vi.advanceTimersByTime(100));

    expect(screen.getByText('Не удалось загрузить котика :(')).toBeInTheDocument();
    expect(screen.queryByAltText('Random cat image')).not.toBeInTheDocument();
  });

  it('Авто-обновление котиков работает при прожатом чекбоксе', async () => {
    render(<CatsSection />);

    const autoRefreshCheckbox = screen.getByLabelText('Auto-refresh every 5 seconds');
    fireEvent.click(autoRefreshCheckbox);

    expect(autoRefreshCheckbox).toBeChecked();

    // Продвигаем время на 5 секунд
    await act(() => vi.advanceTimersByTime(5000));
    expect(fetchRandomCat).toHaveBeenCalledTimes(1);

    // Еще 5 секунд
    await act(() => vi.advanceTimersByTime(5000));
    expect(fetchRandomCat).toHaveBeenCalledTimes(2);
  });

  it('Авто-обновление котиков прекращается после отжатия чекбоксе', async () => {
    render(<CatsSection />);

    const autoRefreshCheckbox = screen.getByLabelText('Auto-refresh every 5 seconds');
    fireEvent.click(autoRefreshCheckbox);
    expect(autoRefreshCheckbox).toBeChecked();

    await act(() => vi.advanceTimersByTime(5000));
    expect(fetchRandomCat).toHaveBeenCalledTimes(1);

    // Отключаем авто-обновление
    fireEvent.click(autoRefreshCheckbox);
    expect(autoRefreshCheckbox).not.toBeChecked();

    // Продвигаем время - новых вызовов быть не должно
    await act(() => vi.advanceTimersByTime(10000));
    expect(fetchRandomCat).toHaveBeenCalledTimes(1);
  });

  it('Интервал очищается при размонтировании', async () => {
    const { unmount } = render(<CatsSection />);

    const autoRefreshCheckbox = screen.getByLabelText('Auto-refresh every 5 seconds');
    fireEvent.click(autoRefreshCheckbox);

    unmount();

    await act(() => vi.advanceTimersByTime(10000));
    expect(fetchRandomCat).not.toHaveBeenCalled();
  });

  it('Коты не фетчатся при disabled', async () => {
    render(<CatsSection />);

    // Отжимаем Enabled
    fireEvent.click(screen.getByLabelText('Enabled'));
    expect(screen.getByLabelText('Enabled')).not.toBeChecked();

    // Включаем авто-обновление (но Enabled отжат)
    fireEvent.click(screen.getByLabelText('Auto-refresh every 5 seconds'));

    await act(() => vi.advanceTimersByTime(10000));
    expect(fetchRandomCat).not.toHaveBeenCalled();
  });
});