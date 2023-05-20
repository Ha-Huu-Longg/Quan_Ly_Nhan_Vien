import ConstantList from '../../appConfig';
import { withTranslation } from 'react-i18next';
import UpdateHappenings from '.';

const ViewComponent = withTranslation()(UpdateHappenings);

const UpdateHappeningsRoutes = [
    {
        path: ConstantList.ROOT_PATH + 'list/updateHappenings',
        exact: true,
        component: ViewComponent,
    },
];

export default UpdateHappeningsRoutes;
