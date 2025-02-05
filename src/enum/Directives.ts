import { NodeTypes } from './NodeTypes';

export enum Directives {
  if = NodeTypes.Condition,
  else = NodeTypes.Else,
  elseif = NodeTypes.ConditionElse,
  elseIf = NodeTypes.ConditionElse,
  list = NodeTypes.List,
  include = NodeTypes.Include,
  assign = NodeTypes.Assign,
  attempt = NodeTypes.Attempt,
  compress = NodeTypes.Compress,
  autoesc = NodeTypes.AutoEsc,
  autoEsc = NodeTypes.AutoEsc,
  noAutoEsc = NodeTypes.NoAutoEsc,
  noautoesc = NodeTypes.NoAutoEsc,
  escape = NodeTypes.Escape,
  noescape = NodeTypes.NoEscape,
  fallback = NodeTypes.Fallback,
  function = NodeTypes.Function,
  flush = NodeTypes.Flush,
  ftl = NodeTypes.Ftl,
  global = NodeTypes.Global,
  import = NodeTypes.Import,
  items = NodeTypes.Items, // TODO: disabled
  local = NodeTypes.Local,
  lt = NodeTypes.Lt,
  macro = NodeTypes.Macro, // TODO: disabled
  outputFormat = NodeTypes.OutputFormat,
  outputformat = NodeTypes.OutputFormat,
  nested = NodeTypes.Nested, // TODO: unsupported
  nt = NodeTypes.Nt,
  recover = NodeTypes.Recover,
  recurse = NodeTypes.Recurse, // TODO: unsupported
  return = NodeTypes.Return,
  rt = NodeTypes.Rt,
  setting = NodeTypes.Setting,
  stop = NodeTypes.Stop,
  switch = NodeTypes.Switch,
  case = NodeTypes.SwitchCase,
  default = NodeTypes.SwitchDefault,
  break = NodeTypes.Break,
  t = NodeTypes.T,
  visit = NodeTypes.Visit, // TODO: unsupported
  noparse = NodeTypes.Text,
  noParse = NodeTypes.Text,
}
