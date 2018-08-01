## redux-connect-binder

Redux-connect-binder is a library used for simplify the usage of redux/redux-connect. As before, if someone wants to connect a componet, he must write redundant codes for every component, this is so boring. So, I wrapped the `mapStateToProps` , `mapDispatchToProps` and `connect` functions with high-order functions to hide the details. All you need is to add the component you write and some options to the high-order functions. :beer: 



### Functions

**1. mapStateWrapper**

```jsx
// @params: props<Array<String|Array|Object>> "props name mapping array used from redux connect state"
//          rules_string: /[a-zA-Z0-9]+/
//          rules_array: [/[a-zA-Z0-9]+/, /([a-zA-Z0-9]+\.)*[a-zA-Z0-9]+/]
//          rules_array_with_func: [/[a-zA-Z0-9]+/, accessor_func]
//          rules_object: {name: ([a-zA-Z0-9]+)*, accessor: /([a-zA-Z0-9]+\.)*[a-zA-Z0-9]+/, prefix: true/false}
//          rules_object_with_func: {name: ([a-zA-Z0-9]+)*, accessor: accessor_func, prefix: true/false}
//          *warning* prefix is default global, unless you set it to false explicitly.

// @params: prefix<String> "common prefix for props name"
//			rules: /([a-zA-Z0-9]+\.)*[a-zA-Z0-9]+/
// @return: mapStateToProps<Function>

prefix = 'n';
props = ['a']; // Assuming prefix is n, mapping: state.n.a => this.props.a
props = [['a', 'a.b']]; // Assuming prefix is n, mapping: state.n.a.b => this.props.a
props = [{name: 'a', accessor: 'a.b'}]; // Assuming prefix is n, mapping: state.n.a.b => this.props.a
props = [['a', (state) => state.x.c]] // mapping: state.a.x.c => this.props.a
props = [{name: 'a', accessor: (state) => state.x.c]}] // mapping: state.a.x.c => this.props.a
props = [{name: 'a', accessor: (state) => state.x.c], prefix: false}] // mapping: state.x.c => this.props.a
```



**2. mapDispatchWrapper**

```jsx
// @params: actions<Array<Object>> "dispatch action object array"
// @return: mapDispatchToProps<Function>

actions = [{action1: (dispatch) => dispatch({type: ACTION_TYPE})}, {action2: (dispatch) => dispatch({type: ACTION_TYPE})}]
```



**3. bindConnector**

```jsx
// @params: component<React.Component> "the component needs to be connected"
// @params: props<Array<String>> "props name array used from redux connect state"
//          rules: /([a-zA-Z0-9]+\.)*[a-zA-Z0-9]+/
// @params: prefix<String> "common prefix for props name"
//			rules: /([a-zA-Z0-9]+\.)*[a-zA-Z0-9]+/
// @params: actions<Array<Object>> "dispatch action object array"
// @return: connectedComponent<React.Component>
import {bindConnector} from 'redux-connect-binder';
class component extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // in your code, you can use 
        // props: this.props.a / this.props.a.b / this.props.a.b.c
        // actions: this.props.actions1 / this.props.actions2
        return <div>Hello, World</div>;
    }
}
props = ['a', 'a.b', 'b.c.d'];
prefix = 'a' / 'a.b';
actions = [{action1: (dispatch) => dispatch({type: ACTION_TYPE})}, {action2: (dispatch) => dispatch({type: ACTION_TYPE})}]

module.exports = bindConnector({component: component, props, prefix, actions});
```

