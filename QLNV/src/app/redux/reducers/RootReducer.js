import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import UserReducer from './UserReducer';
import LayoutReducer from './LayoutReducer';
import ScrumBoardReducer from './ScrumBoardReducer';
import NotificationReducer from './NotificationReducer';
import EcommerceReducer from './EcommerceReducer';
import UpdateHappeningReducer from './UpdateHappeningsReducer';
import LeaderReducer from './LeaderReducer';
import EndStaffReducer from './EndStaffReducer';
import CreateStaffReducer from './CreateStaffReducer';
// import NewStaffReducer from "./NewStaffReducer";
// import AddressReducer from "./AddressReducer";

const RootReducer = combineReducers({
    login: LoginReducer,
    user: UserReducer,
    layout: LayoutReducer,
    scrumboard: ScrumBoardReducer,
    notification: NotificationReducer,
    ecommerce: EcommerceReducer,
    createStaff: CreateStaffReducer,
    updateEmployee: UpdateHappeningReducer,
    endStaff: EndStaffReducer,
    leaderReducer: LeaderReducer,
    // staff: NewStaffReducer,
    // Address: AddressReducer,
});

export default RootReducer;
