// Generated by dts-bundle v0.7.3

declare module 'freemarker-parser' {
    import { Parser } from 'freemarker-parser/Parser';
    import { Tokenizer } from 'freemarker-parser/Tokenizer';
    export { Parser, Tokenizer };
}

declare module 'freemarker-parser/Parser' {
    import { IToken } from 'freemarker-parser/types/Tokens';
    import { IProgram } from 'freemarker-parser/types/Node';
    export interface IParserReturn {
        ast: IProgram;
        tokens: IToken[];
    }
    export class Parser {
        parse(template: string): IParserReturn;
    }
}

declare module 'freemarker-parser/Tokenizer' {
    import { IToken } from 'freemarker-parser/types/Tokens';
    export class Tokenizer {
        parse(template: string): IToken[];
    }
}

declare module 'freemarker-parser/types/Tokens' {
    import { ENodeType } from 'freemarker-parser/Symbols';
    import { NodeNames } from 'freemarker-parser/types/Node';
    import { IExpression } from 'freemarker-parser/types/Params';
    export interface IDirectivesTypes {
        [n: string]: NodeNames;
    }
    export const directives: IDirectivesTypes;
    export interface IToken {
        type: ENodeType;
        start: number;
        end: number;
        params: IExpression;
        text: string;
        isClose: boolean;
    }
}

declare module 'freemarker-parser/types/Node' {
    import { IExpression } from 'freemarker-parser/types/Params';
    export enum NodeNames {
        Program = "Program",
        Else = "Else",
        Condition = "Condition",
        Include = "Include",
        List = "List",
        Text = "Text",
        Assign = "Assign",
        Global = "Global",
        Local = "Local",
        Macro = "Macro",
        MacroCall = "MacroCall",
        Interpolation = "Interpolation",
        Attempt = "Attempt",
        Recover = "Recover",
        Comment = "Comment",
        Switch = "Switch",
        SwitchCase = "SwitchCase",
        SwitchDefault = "SwitchDefault",
        Break = "Break",
        ConditionElse = "ConditionElse",
    }
    export interface INode {
        type: NodeNames;
        start: number;
        end: number;
    }
    export interface IProgram extends INode {
        type: NodeNames.Program;
        body: INode[];
    }
    export interface ICondition extends INode {
        type: NodeNames.Condition;
        params: IExpression;
        consequent: INode[];
        alternate?: INode[];
    }
    export interface IInclude extends INode {
        type: NodeNames.Include;
        params: IExpression;
    }
    export interface IList extends INode {
        type: NodeNames.List;
        params: IExpression;
        body: INode[];
        fallback?: INode[];
    }
    export interface IText extends INode {
        type: NodeNames.Text;
        text: string;
    }
    export interface IMacro extends INode {
        type: NodeNames.Macro;
        params: IExpression;
        body: INode[];
    }
    export interface IMacroCall extends INode {
        type: NodeNames.MacroCall;
        params: IExpression;
        name: string;
        body?: INode[];
    }
    export interface IAssign extends INode {
        type: NodeNames.Assign;
        params: IExpression;
    }
    export interface IGlobal extends INode {
        type: NodeNames.Global;
        params: IExpression;
    }
    export interface ILocal extends INode {
        type: NodeNames.Local;
        params: IExpression;
    }
    export interface IInterpolation extends INode {
        type: NodeNames.Interpolation;
        params: IExpression;
    }
    export interface IAttempt extends INode {
        type: NodeNames.Attempt;
        body: INode[];
        fallback?: INode[];
    }
    export interface IComment extends INode {
        type: NodeNames.Comment;
        text: string;
    }
    export interface ISwitch extends INode {
        type: NodeNames.Switch;
        params: IExpression;
        cases: NodeSwitchGroup[];
    }
    export interface ISwitchCase extends INode {
        type: NodeNames.SwitchCase;
        params: IExpression;
        consequent: INode[];
    }
    export interface ISwitchDefault extends INode {
        type: NodeNames.SwitchDefault;
        consequent: INode[];
    }
    export interface IBreak extends INode {
        type: NodeNames.Break;
    }
    export type NodeSwitchGroup = ISwitchCase | ISwitchDefault;
    export type AllNodeTypes = IInterpolation | IMacroCall | IProgram | IText | IComment | ICondition | IList | IGlobal | ILocal | IAssign | IInclude | IMacro | IAttempt | ISwitch | ISwitchCase | ISwitchDefault | IBreak;
}

declare module 'freemarker-parser/Symbols' {
    export enum ENodeType {
        Program = "Program",
        Directive = "Directive",
        Macro = "Macro",
        Text = "Text",
        Interpolation = "Interpolation",
        Comment = "Comment",
    }
    export interface ISymbol {
        startToken: string;
        endToken: string[];
        type: ENodeType;
        end: boolean;
    }
    export const symbols: ISymbol[];
}

declare module 'freemarker-parser/types/Params' {
    export enum ParamNames {
        Empty = "Empty",
        Compound = "Compound",
        Identifier = "Identifier",
        MemberExpression = "MemberExpression",
        Literal = "Literal",
        CallExpression = "CallExpression",
        UnaryExpression = "UnaryExpression",
        BinaryExpression = "BinaryExpression",
        LogicalExpression = "LogicalExpression",
        ArrayExpression = "ArrayExpression",
    }
    export interface IExpression {
        type: ParamNames;
    }
    export interface IEmpty extends IExpression {
        type: ParamNames.Empty;
    }
    export interface ICompound extends IExpression {
        type: ParamNames.Compound;
        body: AllParamTypes[];
    }
    export interface ILiteral extends IExpression {
        type: ParamNames.Literal;
        value: any;
        raw: string;
    }
    export interface IArrayExpression extends IExpression {
        type: ParamNames.ArrayExpression;
        elements: AllParamTypes[];
    }
    export interface IIdentifier extends IExpression {
        type: ParamNames.Identifier;
        name: string;
    }
    export interface IBinaryExpression extends IExpression {
        type: ParamNames.BinaryExpression;
        operator: string;
        left: AllParamTypes;
        right: AllParamTypes;
    }
    export interface ILogicalExpression extends IExpression {
        type: ParamNames.LogicalExpression;
        operator: string;
        left: AllParamTypes;
        right: AllParamTypes;
    }
    export interface IUnaryExpression extends IExpression {
        type: ParamNames.UnaryExpression;
        operator: string;
        argument: AllParamTypes;
        prefix: boolean;
    }
    export interface IMemberExpression extends IExpression {
        type: ParamNames.MemberExpression;
        computed: boolean;
        object: AllParamTypes;
        property: AllParamTypes | null;
    }
    export interface ICallExpression extends IExpression {
        type: ParamNames.CallExpression;
        arguments: AllParamTypes[];
        callee: AllParamTypes;
    }
    export type AllParamTypes = ILiteral | IArrayExpression | IIdentifier | IBinaryExpression | ILogicalExpression | IUnaryExpression | IMemberExpression | ICallExpression | ICompound;
}

