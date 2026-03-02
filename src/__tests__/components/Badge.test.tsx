import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../../components/common/Badge';

describe('Badge', () => {
  it('renders label text', () => {
    render(<Badge label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    const { container } = render(<Badge label="Default" />);
    expect(container.firstChild).toHaveClass('bg-gray-100');
  });

  it('applies success variant classes', () => {
    const { container } = render(<Badge label="Success" variant="success" />);
    expect(container.firstChild).toHaveClass('bg-green-100');
  });

  it('applies danger variant classes', () => {
    const { container } = render(<Badge label="Danger" variant="danger" />);
    expect(container.firstChild).toHaveClass('bg-red-100');
  });

  it('applies info variant classes', () => {
    const { container } = render(<Badge label="Info" variant="info" />);
    expect(container.firstChild).toHaveClass('bg-blue-100');
  });
});
