import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('Корректно отрисовывает стандартное состояние', () => {
    render(<Checkbox label="Test checkbox" onStateChange={() => {}} />);
    
    const checkbox = screen.getByRole('checkbox', { name: 'Test checkbox' });
    const labelText = screen.getByText('Test checkbox');
    
    expect(checkbox).toBeInTheDocument();
    expect(labelText).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('Имеет чекнутое состояние при прокинутом defaultChecked', () => {
    render(
      <Checkbox 
        label="Pre-checked" 
        onStateChange={() => {}} 
        defaultChecked={true} 
      />
    );
    
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('Переключение состояние отрабатывает корректно', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Toggle" onStateChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    
    // Первый клик - должен включить
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(handleChange).toHaveBeenCalledWith(true);
    
    // Второй клик - должен выключить
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(handleChange).toHaveBeenCalledWith(false);
    
    // Проверяем количество вызовов
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it('Клик по label меняет состояние чекбокса', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Click label" onStateChange={handleChange} />);
    
    const labelText = screen.getByText('Click label');
    fireEvent.click(labelText);
    
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('Имеет корректные атрибуты, связанные с доступностью', () => {
    render(<Checkbox label="Accessible" onStateChange={() => {}} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'Accessible');
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });
});