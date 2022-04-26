import React from 'react';
import { render, screen } from "@testing-library/react";
import HabitAddForm from "../habitAddForm";
import userEvent from '@testing-library/user-event';

describe('HabitAdd', () => {
  let onAdd;
  let input;
  let button;
  beforeEach(() => {
    onAdd = jest.fn();
    render(<HabitAddForm onAdd={onAdd} />);
    input = screen.getByPlaceholderText('Habit');
    button = screen.getByText('Add');
  });

  it('call onAdd when button is clicked', () => {
    // input에 원하는 습관의 이름을 타이핑 한 다음에
    // add라는 버튼을 클릭하면
    // onAdd가 input에 입력된 이름과 함께 호출되어야 함
    userEvent.type(input, 'New Habit');
    userEvent.click(button);
    
    // onAdd라는 함수가 New Habit과 함께 호출되어야 한다.
    expect(onAdd).toHaveBeenCalledWith('New Habit');
  });

  it('does not call onAdd when the habit is empty', () => {
    userEvent.type(input, '');
    userEvent.click(button);

    // input의 값이 비었을 때, onAdd는 호출되면 안 된다.
    expect(onAdd).toHaveBeenCalledTimes(0);
  })
})