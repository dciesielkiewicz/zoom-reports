import { hasCountInName } from './utils';

describe('ZoomReports utils', () => {
  test('hasCountInName work as expected', () => {
    expect(hasCountInName('12')).toBeTruthy();
    expect(hasCountInName('Test name 20')).toBeTruthy();
    expect(hasCountInName('Test name 26')).toBeFalsy();
    expect(hasCountInName('Test name 123456')).toBeFalsy();
    expect(hasCountInName('Test name')).toBeFalsy();
  });
});
