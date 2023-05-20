import React from 'react';
import { Redirect } from 'react-router-dom';
import homeRoutes from './views/home/HomeRoutes';
import sessionRoutes from './views/sessions/SessionRoutes';
import dashboardRoutes from './views/dashboard/DashboardRoutes';
import ConstantList from './appConfig';
import pageLayoutRoutes from './views/page-layouts/PageLayoutRoutees';
import MenuRoutes from './views/Menus/MenuRoutes';
import UpdateHappeningsRoutes from './views/UpdateHappenings/UpdateHappeningsRoutes';
import EndStaffRoutes from './views/EndStaff/EndStaffRoutes';
import PendingRoutes from './views/Pending/PendingRoutes';
import StaffAcceptedRoutes from './views/StaffAccepted/StaffAcceptedRoutes';
import CreateStaffRoutes from './views/CreateStaff/CreateStaffRoutes';

const errorRoute = [
    {
        component: () => <Redirect to={ConstantList.ROOT_PATH + 'session/404'} />,
    },
];

const routes = [
    ...homeRoutes,
    ...sessionRoutes,
    ...dashboardRoutes,
    ...pageLayoutRoutes,
    ...MenuRoutes,
    ...CreateStaffRoutes,
    ...UpdateHappeningsRoutes,
    ...EndStaffRoutes,
    ...PendingRoutes,
    ...StaffAcceptedRoutes,
    ...errorRoute,
];

export default routes;
