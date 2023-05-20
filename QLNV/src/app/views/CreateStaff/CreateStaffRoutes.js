import ConstantList from '../../appConfig';
import { withTranslation } from 'react-i18next';
import CreateStaff from '.';

const ViewComponent = withTranslation()(CreateStaff);

const CreateStaffRoutes = [
    {
        path: ConstantList.ROOT_PATH + 'list/createStaff',
        exact: true,
        component: ViewComponent,
    },
];

export default CreateStaffRoutes;
