import { render } from 'testUtils';
import { Header } from './Header';

describe('Header', () => {
  test('Should render Zoom Reports header', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Zoom Reports')).toBeInTheDocument();
  });
});
