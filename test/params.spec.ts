import { Operators } from '../src/enum/Operators';
import ParamNames from '../src/enum/ParamNames';
import { ParamsParser } from '../src/ParamsParser';
import { AllParamTypes } from '../src/interface/Params';

function parse(template: string): AllParamTypes {
  const parser = new ParamsParser(template);
  return parser.parseExpressions();
}

describe('params parser', () => {
  it('BinaryExpression', () => {
    const result = parse('a + 1');
    const expected = {
      type: ParamNames.BinaryExpression,
      operator: Operators.PLUS,
      left: {
        type: ParamNames.Identifier,
        name: 'a',
      },
      right: {
        type: ParamNames.Literal,
        value: 1,
        raw: '1',
      },
    };
    expect(result).toEqual(expected);
  });

  it('non-literal variable', () => {
    const result = parse('foo.baz');
    const expected = {
      type: ParamNames.MemberExpression,
      computed: false,
      object: {
        type: ParamNames.Identifier,
        name: 'foo',
      },
      property: {
        type: ParamNames.Identifier,
        name: 'baz',
      },
    };
    expect(result).toEqual(expected);
  });

  it('non-literal array', () => {
    const result = parse("foo['baz']");
    const expected = {
      type: ParamNames.MemberExpression,
      computed: true,
      object: {
        type: ParamNames.Identifier,
        name: 'foo',
      },
      property: {
        type: ParamNames.Literal,
        value: 'baz',
        raw: "'baz'",
      },
    };
    expect(result).toStrictEqual(expected);
  });

  it('unary prefix', () => {
    const result = parse('++foo');
    const expected = {
      type: ParamNames.UpdateExpression,
      operator: Operators.PLUS_PLUS,
      prefix: true,
      argument: {
        type: ParamNames.Identifier,
        name: 'foo',
      },
    };
    expect(result).toStrictEqual(expected);
  });

  it('unary suffix', () => {
    const result = parse('foo++');
    const expected = {
      type: ParamNames.UpdateExpression,
      operator: Operators.PLUS_PLUS,
      prefix: false,
      argument: {
        type: ParamNames.Identifier,
        name: 'foo',
      },
    };
    expect(result).toStrictEqual(expected);
  });

  it('toUpperCase', () => {
    const result = parse('foo?toUpperCase');
    const expected = {
      type: ParamNames.BuiltInExpression,
      left: {
        type: ParamNames.Identifier,
        name: 'foo',
      },
      operator: Operators.BUILT_IN,
      right: {
        type: ParamNames.Identifier,
        name: 'toUpperCase',
      },
    };
    expect(result).toStrictEqual(expected);
  });

  it('array expression', () => {
    const result = parse('["","a"]');
    const expected = {
      type: ParamNames.ArrayExpression,
      elements: [
        {
          type: ParamNames.Literal,
          value: '',
          raw: '""',
        },
        {
          type: ParamNames.Literal,
          value: 'a',
          raw: '"a"',
        },
      ],
    };
    expect(result).toStrictEqual(expected);
  });

  it('empty object expression', () => {
    const result = parse('{}');
    const expected = {
      type: ParamNames.MapExpression,
      elements: [],
    };
    expect(result).toStrictEqual(expected);
  });

  it('object expression', () => {
    const result = parse('{"x":1,"y":2}');
    const expected = {
      type: ParamNames.MapExpression,
      elements: [
        {
          key: {
            type: ParamNames.Literal,
            value: 'x',
            raw: '"x"',
          },
          value: {
            type: ParamNames.Literal,
            value: 1,
            raw: '1',
          },
        },
        {
          key: {
            type: ParamNames.Literal,
            value: 'y',
            raw: '"y"',
          },
          value: {
            type: ParamNames.Literal,
            value: 2,
            raw: '2',
          },
        },
      ],
    };
    expect(result).toStrictEqual(expected);
  });

  it('to string', () => {
    const result = parse('foo?string("yes")');
    const expected = {
      type: ParamNames.BuiltInExpression,
      left: {
        type: ParamNames.Identifier,
        name: 'foo',
      },
      operator: Operators.BUILT_IN,
      right: {
        type: ParamNames.CallExpression,
        arguments: [
          {
            type: ParamNames.Literal,
            raw: '"yes"',
            value: 'yes',
          },
        ],
        callee: {
          name: 'string',
          type: ParamNames.Identifier,
        },
      },
    };
    expect(result).toStrictEqual(expected);
  });

  it('range binary', () => {
    const result = parse('1..2');
    const expected = {
      type: ParamNames.BinaryExpression,
      left: {
        type: ParamNames.Literal,
        value: 1,
        raw: '1',
      },
      operator: Operators.DOT_DOT,
      right: {
        type: ParamNames.Literal,
        value: 2,
        raw: '2',
      },
    };
    expect(result).toEqual(expected);
  });

  it('range binary with vars', () => {
    const result = parse('x..2');
    const expected = {
      type: ParamNames.BinaryExpression,
      left: {
        type: ParamNames.Identifier,
        name: 'x',
      },
      operator: Operators.DOT_DOT,
      right: {
        type: ParamNames.Literal,
        value: 2,
        raw: '2',
      },
    };
    expect(result).toEqual(expected);
  });

  it('range compound less', () => {
    const result = parse('1..<2');
    const expected = {
      type: ParamNames.BinaryExpression,
      left: {
        type: ParamNames.Literal,
        value: 1,
        raw: '1',
      },
      operator: Operators.DOT_DOT_LESS,
      right: {
        type: ParamNames.Literal,
        value: 2,
        raw: '2',
      },
    };
    expect(result).toEqual(expected);
  });

  it('range compound not', () => {
    const result = parse('1..!2');
    const expected = {
      type: ParamNames.BinaryExpression,
      left: {
        type: ParamNames.Literal,
        value: 1,
        raw: '1',
      },
      operator: Operators.DOT_DOT_NOT,
      right: {
        type: ParamNames.Literal,
        value: 2,
        raw: '2',
      },
    };
    expect(result).toEqual(expected);
  });

  it('range compound asterisk', () => {
    const result = parse('1..*2');
    const expected = {
      type: ParamNames.BinaryExpression,
      left: {
        type: ParamNames.Literal,
        value: 1,
        raw: '1',
      },
      operator: Operators.DOT_DOT_ASTERISK,
      right: {
        type: ParamNames.Literal,
        value: 2,
        raw: '2',
      },
    };
    expect(result).toEqual(expected);
  });

  it('range unary', () => {
    const result = parse('1..');
    const expected = {
      type: ParamNames.UnaryExpression,
      operator: Operators.DOT_DOT,
      argument: {
        type: ParamNames.Literal,
        value: 1,
        raw: '1',
      },
      prefix: false,
    };
    expect(result).toEqual(expected);
  });

  it('range slicing', () => {
    const result = parse('x[1..2]');
    const expected = {
      type: ParamNames.MemberExpression,
      computed: true,
      object: {
        name: 'x',
        type: ParamNames.Identifier,
      },
      property: {
        type: ParamNames.BinaryExpression,
        left: {
          type: ParamNames.Literal,
          value: 1,
          raw: '1',
        },
        operator: Operators.DOT_DOT,
        right: {
          type: ParamNames.Literal,
          value: 2,
          raw: '2',
        },
      },
    };
    expect(result).toEqual(expected);
  });

  it('range slicing less', () => {
    const result = parse('x[1..<2]');
    const expected = {
      type: ParamNames.MemberExpression,
      computed: true,
      object: {
        name: 'x',
        type: ParamNames.Identifier,
      },
      property: {
        type: ParamNames.BinaryExpression,
        left: {
          type: ParamNames.Literal,
          value: 1,
          raw: '1',
        },
        operator: Operators.DOT_DOT_LESS,
        right: {
          type: ParamNames.Literal,
          value: 2,
          raw: '2',
        },
      },
    };
    expect(result).toEqual(expected);
  });

  it('range slicing not', () => {
    const result = parse('x[1..!2]');
    const expected = {
      type: ParamNames.MemberExpression,
      computed: true,
      object: {
        name: 'x',
        type: ParamNames.Identifier,
      },
      property: {
        type: ParamNames.BinaryExpression,
        left: {
          type: ParamNames.Literal,
          value: 1,
          raw: '1',
        },
        operator: Operators.DOT_DOT_NOT,
        right: {
          type: ParamNames.Literal,
          value: 2,
          raw: '2',
        },
      },
    };
    expect(result).toEqual(expected);
  });

  it('range slicing asterisk', () => {
    const result = parse('x[1..*2]');
    const expected = {
      type: ParamNames.MemberExpression,
      computed: true,
      object: {
        name: 'x',
        type: ParamNames.Identifier,
      },
      property: {
        type: ParamNames.BinaryExpression,
        left: {
          type: ParamNames.Literal,
          value: 1,
          raw: '1',
        },
        operator: Operators.DOT_DOT_ASTERISK,
        right: {
          type: ParamNames.Literal,
          value: 2,
          raw: '2',
        },
      },
    };
    expect(result).toEqual(expected);
  });

  it('range slicing unary', () => {
    const result = parse('x[1..]');
    const expected = {
      type: ParamNames.MemberExpression,
      computed: true,
      object: {
        name: 'x',
        type: ParamNames.Identifier,
      },
      property: {
        type: ParamNames.UnaryExpression,
        operator: Operators.DOT_DOT,
        argument: {
          type: ParamNames.Literal,
          value: 1,
          raw: '1',
        },
        prefix: false,
      },
    };
    expect(result).toEqual(expected);
  });

  it('exists', () => {
    const result = parse('x??');
    const expected = {
      type: ParamNames.UnaryExpression,
      operator: Operators.EXISTS,
      argument: {
        type: ParamNames.Identifier,
        name: 'x',
      },
      prefix: false,
    };
    expect(result).toEqual(expected);
  });

  it('exists in member', () => {
    const result = parse('x[y]??');
    const expected = {
      type: ParamNames.UnaryExpression,
      operator: Operators.EXISTS,
      argument: {
        type: ParamNames.MemberExpression,
        computed: true,
        object: {
          type: ParamNames.Identifier,
          name: 'x',
        },
        property: {
          type: ParamNames.Identifier,
          name: 'y',
        },
      },
      prefix: false,
    };
    expect(result).toEqual(expected);
  });

  it('exists in logical', () => {
    const result = parse('x && y?? && z');
    const expected = {
      type: ParamNames.LogicalExpression,
      operator: Operators.AND,
      left: {
        type: ParamNames.LogicalExpression,
        operator: Operators.AND,
        left: {
          type: ParamNames.Identifier,
          name: 'x',
        },
        right: {
          type: ParamNames.UnaryExpression,
          operator: Operators.EXISTS,
          argument: {
            type: ParamNames.Identifier,
            name: 'y',
          },
          prefix: false,
        },
      },
      right: {
        type: ParamNames.Identifier,
        name: 'z',
      },
    };
    expect(result).toEqual(expected);
  });

  it('infinite range in logical', () => {
    const result = parse('x && 1..');
    const expected = {
      type: ParamNames.LogicalExpression,
      operator: Operators.AND,
      left: {
        type: ParamNames.Identifier,
        name: 'x',
      },
      right: {
        type: ParamNames.UnaryExpression,
        operator: Operators.DOT_DOT,
        argument: {
          type: ParamNames.Literal,
          value: 1,
          raw: '1',
        },
        prefix: false,
      },
    };
    expect(result).toEqual(expected);
  });

  it('binary range in logical', () => {
    const result = parse('x && 1..2');
    const expected = {
      type: ParamNames.LogicalExpression,
      operator: Operators.AND,
      left: {
        type: ParamNames.Identifier,
        name: 'x',
      },
      right: {
        type: ParamNames.BinaryExpression,
        operator: Operators.DOT_DOT,
        left: {
          type: ParamNames.Literal,
          value: 1,
          raw: '1',
        },
        right: {
          type: ParamNames.Literal,
          value: 2,
          raw: '2',
        },
      },
    };
    expect(result).toEqual(expected);
  });

  it('exclamation unary', () => {
    const result = parse('x!');
    const expected = {
      type: ParamNames.UnaryExpression,
      argument: {
        type: ParamNames.Identifier,
        name: 'x',
      },
      operator: Operators.EXCLAM,
      prefix: false,
    };
    console.log(result);
    expect(result).toEqual(expected);
  });

  it('exclamation binary', () => {
    const result = parse('x!y');
    const expected = {
      type: ParamNames.BinaryExpression,
      left: {
        type: ParamNames.Identifier,
        name: 'x',
      },
      operator: Operators.EXCLAM,
      right: {
        type: ParamNames.Identifier,
        name: 'y',
      },
    };
    expect(result).toEqual(expected);
  });
});
