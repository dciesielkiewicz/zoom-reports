import { render } from '@testing-library/react';
import { ZoomReports } from './ZoomReports';

describe('ZoomReports', () => {
  test('Should render welcome heading, subheading and navigation buttons', () => {
    const { getByText } = render(<ZoomReports />);
    expect(getByText('Welcome to Attendees Zoom Reports.')).toBeInTheDocument();
  });
});
