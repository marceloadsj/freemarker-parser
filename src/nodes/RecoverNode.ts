import { NodeTypes } from '../enum/NodeTypes';
import { Token } from '../interface/Tokens';
import AbstractNode from './abstract/AbstractNode';

export default class RecoverNode extends AbstractNode {
  constructor(token: Token) {
    super(NodeTypes.Recover, token);
    this.noParams(token);
  }
}
