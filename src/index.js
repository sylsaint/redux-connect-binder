import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { accessor, checkType, validate, getSequenceProperty } from './util';
import { STRING, ARRAY, OBJECT, FUNCTION } from './util';

export function mapStateWrapper(props, prefix) {
  if (!validate(prefix)) {
    return {};
  }
  return function (state) {
    let propsMap = {};
    props.map(p => {
      let prefixKeys = accessor(prefix);
      let keys;
      let name;
      switch(checkType(p)) {
        case STRING:
          name = p;
          keys = prefixKeys.concat([p]);
          break;
        case ARRAY:
          name = p[0];
          if(checkType(p[1]) === STRING) {
            keys = prefixKeys.concat(accessor(p[1]))
          } else if (checkType(p[1] === FUNCTION)) {
            keys = prefixKeys.concat([p[1]]);
          }
          break;
        case OBJECT:
          name = p.name;
          if(checkType(p.accessor) === STRING) {
            if (p.prefix || p.prefix === undefined) {
              keys = prefixKeys.concat(accessor(p.accessor));
            } else {
              keys = accessor(p.accessor);
            }
          } else if (checkType(p.accessor === FUNCTION)) {
            if (p.prefix) {
              keys = prefixKeys.concat([p.accessor]);
            } else {
              keys = [p.accessor];
            }
          }
          break;
        default:
          break;
      }
      propsMap[name] = getSequenceProperty(state, keys);
    });
    return propsMap;
  }
}

export function mapDispatchWrapper(actions = []) {
  return function (dispatch) {
    let dMap = actions.reduce((prev, cur) => Object.assign({}, prev, cur), {});
    return bindActionCreators(dMap, dispatch);
  }
}

/*
* @desc:   wrapper for redux usage in component to avoid redundant codes
* @params: component<React.Component>
* @params: actions<Array<Function>>
* @params: props<Array<String>>
* @params: prefix<String>
* @return: React.Component
*/
export function bindConnector({ component, actions, props, prefix }) {
  const mapStateToProps = mapStateWrapper(props, prefix);
  const mapDispatchToProps = mapDispatchWrapper(actions);
  return connect(mapStateToProps, mapDispatchToProps)(component);
}
