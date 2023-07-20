import ForTesting from '@/components/for-testing';
import { render, fireEvent, act } from '@testing-library/react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<ForTesting />).toJSON();
  expect(tree).toMatchSnapshot();
})

it('increments the count when button is clicked', async () => {
  const { getByText } = render(<ForTesting />);
  const button = getByText('count++');
  await act(() => {
    fireEvent.click(button);
  })
  expect(getByText('1')).toBeInTheDocument();
});

// TODO use act