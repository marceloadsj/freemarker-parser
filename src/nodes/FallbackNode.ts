import { NodeTypes } from '../enum/NodeTypes';
import { Token } from '../interface/Tokens';
import AbstractNode from './abstract/AbstractNode';

export default class FallbackNode extends AbstractNode {
  constructor(token: Token) {
    super(NodeTypes.Fallback, token);
    this.noParams(token);
  }
}
