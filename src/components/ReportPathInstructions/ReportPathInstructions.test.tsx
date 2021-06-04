import { render } from '@testing-library/react';
import { ReportPathInstructions } from './ReportPathInstructions';

const instruction1 = 'Instruction 1';
const instruction2 = 'Instruction 2';
const instructions = [instruction1, instruction2];


describe('ReportPathInstructions', () => {
  test('Should render instructions', () => {
    const { getByText } = render(<ReportPathInstructions instructions={instructions} />);
    expect(getByText(instruction1)).toBeInTheDocument();
    expect(getByText(instruction2)).toBeInTheDocument();
  });
});
