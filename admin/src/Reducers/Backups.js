import {handleActions} from 'redux-actions';
import Immutable  from 'immutable';
import TreeUtils  from 'immutable-treeutils';

//import {} from '../Constants/Markup';

const treeUtils = new TreeUtils(Immutable.Seq(), 'id', 'children');

export default handleActions({})