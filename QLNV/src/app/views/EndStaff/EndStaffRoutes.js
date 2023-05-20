import EndStaff from '.';
import ConstantList from '../../appConfig';
import { withTranslation } from 'react-i18next';

const ViewComponent = withTranslation()(EndStaff);

const EndStaffRoutes = [
    {
        path: ConstantList.ROOT_PATH + 'list/endStaff',
        exact: true,
        component: ViewComponent,
    },
];

export default EndStaffRoutes;
