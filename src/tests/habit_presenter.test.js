import HabitPresenter from "../components/habit_presenter";

describe('HabitPresenter', () => {
  const habits = [
    { id: 1, name: 'Reading', count: 1 },
    { id: 2, name: 'Running', count: 0 },
  ];
  let presenter;
  let update;

  // 초기화
  beforeEach(() => {
    presenter = new HabitPresenter(habits, 3);
    update = jest.fn(); // mock
  });

  it('inits with habits', () => {
    expect(presenter.getHabits()).toEqual(habits);
  })

  it('increments habit count and call update callback', () => {
    presenter.increment(habits[0], update);

    expect(presenter.getHabits()[0].count).toBe(2);
    checkUpdateIsCalled();
  });

  it('decrements habit count and call update callback', () => {
    presenter.decrement(habits[0], update);

    expect(presenter.getHabits()[0].count).toBe(0);
    checkUpdateIsCalled();
  });

  it('does not set the count value below 0 when decrements', () => {
    presenter.decrement(habits[1], update);
    expect(presenter.getHabits()[1].count).toBe(0);
  });

  it('throws an error when the max habits limit is exceeded', () => {
    presenter.add('new1', update);
    expect(() => {
      presenter.add('new2', update);
    }).toThrow('습관의 갯수는 3 이상이 될 수 없습니다.')
  });

  describe('reset', () => {
    it('resets all habit counts to 0', () => {
      presenter.reset(update);
      expect(presenter.getHabits()[0].count).toBe(0);
      expect(presenter.getHabits()[1].count).toBe(0);
      checkUpdateIsCalled();
    });

    // toBe : object의 참조 값을 검사
    // toEqual : object 안의 값을 검사
    it('does not create new object when count is 0', () => {
      const habits = presenter.getHabits();
      presenter.reset(update);
      const updateHabits = presenter.getHabits();

      expect(updateHabits[1]).toBe(habits[1]); // 오브젝트의 불변성 테스트
    });
  });


  function checkUpdateIsCalled() {
    // toHaveBeenCalledTimes : 호출된 횟수
    expect(update).toHaveBeenCalledTimes(1); 
    // toHaveBeenCalledWith : 이 인자와 함께 호출되어야 한다.
    expect(update).toHaveBeenCalledWith(presenter.getHabits());
  }
})