import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const StaffAccepted = EgretLoadable({
    loader: () => import("./StaffAccepted")
});
const ViewComponent = withTranslation()(StaffAccepted);

const StaffAcceptedRoutes = [
    {
        path: ConstantList.ROOT_PATH + "staffAccepted_manager/staffAccepted",
        exact: true,
        component: ViewComponent
    }
];

export default StaffAcceptedRoutes;