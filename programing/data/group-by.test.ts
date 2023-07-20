import { groupBy, deepGroupBy } from './group-by';

describe('group by', () => {
  const data = [
    { type: 'a', subType: 'a1', value: 1 },
    { type: 'a', subType: 'a2', value: 2 },
    { type: 'b', subType: 'b1', value: 3, },
  ];
  it('should be grouped', () => {
    const tree = groupBy(data, 'type');
    expect(tree).toEqual({
      a: [
        { type: 'a', subType: 'a1', value: 1 },
        { type: 'a', subType: 'a2', value: 2 },
      ],
      b: [
        { type: 'b', subType: 'b1', value: 3 },
      ]
    });
  });
  it('should be deep grouped', () => {
    const tree = deepGroupBy(data, 'type', 'subType');
    expect(tree).toEqual({
      a: {
        a1: [
          { type: 'a', subType: 'a1', value: 1 }
        ],
        a2: [
          { type: 'a', subType: 'a2', value: 2 },
        ]
      },
      b: {
        b1: [
          { type: 'b', subType: 'b1', value: 3 },
        ],
      }
    });
  });
  it('should handle unGrouped value', () => {
    const data = [
      { value: 1 },
      { value: 2 },
    ];
    expect(groupBy(data, 'type')).toEqual({
      _: [
        { value: 1 },
        { value: 2 },
      ]
    });
  });

  it('should handle deep unGrouped value', () => {
    const data = [
      { type: 'a', subType: 'a1', value: 1 },
      { type: 'a', value: 2 },
      { value: 3 }
    ];

    const tree = deepGroupBy(data, 'type', 'subType');

    expect(tree).toEqual({
      a: {
        a1: [
          { type: 'a', subType: 'a1', value: 1 },
        ],
        _: [
          { type: 'a', value: 2 },
        ]
      },
      _: [
        { value: 3 }
      ]
    });
  });
});
