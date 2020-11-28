import React from 'react';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import {render, cleanup, fireEvent, waitFor } from '@testing-library/react'

// Components
import App from '../components/FrontPage/App.jsx';
import Greeting from '../components/FrontPage/Greeting.jsx';
import SearchBar from '../components/FrontPage/SearchBar.jsx';
import Images from '../components/Progress/Images.jsx';
import Planks from '../components/Workout/Planks.jsx';
import Shoulders from '../components/Workout/Shoulders.jsx';
import Button from '../components/Form/Button.jsx';
import ProgressForm from '../components/Form/ProgressForm.jsx';

jest.mock('axios');

// App Component
describe('App', () => {
  test('should render App', () => {
    const wrapper = shallow(
      <App />
    );
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  })
  test('should test Apps component with default state of empty array', () => {
    const wrapper = shallow(<App workouts={[]} />);
    expect(wrapper).toMatchSnapshot();
   });

  test("should test good response", () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: {} }));
  });

  test("should test bad response", () => {
    axios.get.mockImplementation(() => Promise.reject({ }));
  });

  it("displays initial progresses", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find("images")).toHaveLength(0);
  });

  // afterEach(cleanup);

  // it('renders images correctly', async () => {
  //   const wrapper = mount(<App />);
  //   act(() => {
  //     axios.get.mockResolvedValue({
  //       data: [
  //         { workout: 'Shoulders', image: 'test.jpeg' },
  //         { workout: 'Planks', image: 'test.jpeg' },
  //       ],
  //     });
  //   });
  //   const { getByTestId, asFragment } = render(<App />);
  //   const listNode = await getByTestId('images');
  //   expect(listNode.children).toHaveLength(2);
  //   expect(asFragment()).toMatchSnapshot();
  // });
})

// Greeting Component
describe('Greeting', () => {
  test('should render Greeting component', () => {
    const wrapper = shallow(
      <Greeting />
    );
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  })
})

//SearchBar Component
describe('SearchBar', () => {
  test('should render SearchBar component', () => {
    const wrapper = shallow(
      <SearchBar />
    );
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  })
})

//Images Component
describe('Images', () => {
  test("Renders correctly", () => {
    const props = {
      options: [{ key: 'key',text: 'text',value: 'value'}],
      value: 'value',
      placeholder: 'placeholder',
      onSelect: jest.fn(),
      children: <div>test</div>
    }
    const wrapper = shallow(<Images {...props}/>);
    expect(wrapper.exists()).toBe(true);
  });
})

//Planks Component
describe('Planks', () => {
  test('should render Planks component', () => {
    const wrapper = shallow(
      <Planks />
    );
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  })
})

//Shoulders Component
describe('Shoulders', () => {
  test('should render Shoulders component', () => {
    const wrapper = shallow(
      <Shoulders />
    );
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  })
})

//Form Button Component
describe('Form Button', () => {
  test('should render form Button component', () => {
    const wrapper = shallow(
      <Button />
    );
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  })
  it('should disable submit button on submit click', () => {
    const wrapper = mount(<Button />);
    const submitButton = wrapper.find(Button);
    submitButton.simulate('click');

    setTimeout(() => {
      expect(submitButton.prop('disabled')).toBeTruthy();
    });
  });

})

//Progress Form Component
describe('Progress Form', () => {
  let options = [
    {value: 'Shoulders'},
    {value: 'Planks'}
  ];
  test('should render Progress Form component', () => {
    const wrapper = shallow(
      <ProgressForm />
    );
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  })
  // it('Should simulate dropdown workout value change', async () => {
  //   const workoutHandler = value => ({ currentTarget: { value }, target: { value } });
  //   const wrapper = mount(<ProgressForm />);
  //   wrapper.find('select').props().onChange(workoutHandler('Planks'));
  //   await waitFor(() => {
  //     expect(wrapper.render().find('select').val()).to.equal('Planks');
  //   });
  // })
  test('should call onChange when option is selected', async () => {
    const mockedOnChange = jest.fn();
    const { getByText, queryByTestId } = render(<ProgressForm  options={options}
        onChange={mockedOnChange} />);

    const mySelectComponent = queryByTestId('dropdown');

    expect(mySelectComponent).toBeDefined();
    expect(mySelectComponent).not.toBeNull();
    expect(mockedOnChange).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
    await waitFor(() => getByText('Shoulders'));
    fireEvent.click(getByText('Shoulders'));

    expect(mockedOnChange).toHaveBeenCalledTimes(1);
    expect(mockedOnChange).toHaveBeenCalledWith({value: 'Shoulders'});
  })

})
