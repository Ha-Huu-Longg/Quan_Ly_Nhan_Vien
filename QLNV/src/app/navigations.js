import ConstantList from './appConfig';
export const navigations = [
    {
        name: 'Dashboard.dashboard',
        icon: 'dashboard',
        path: ConstantList.ROOT_PATH + 'dashboard/analytics',
        isVisible: true,
    },
    {
        name: 'Dashboard.leader',
        icon: 'engineering',
        path: '',
        isVisible: true,
        children: [
            {
                name: 'Dashboard.pend',
                path: ConstantList.ROOT_PATH + 'pending_manager/pending',
                icon: 'article',
                isVisible: true,
            },
            {
                name: 'Đã duyệt',
                path: ConstantList.ROOT_PATH + 'staffAccepted_manager/staffAccepted',
                icon: 'taskAlt',
                isVisible: true,
            },
        ],
    },
    {
        name: 'Dashboard.manage_staff',
        isVisible: true,
        icon: 'contacts',
        children: [
            {
                name: 'Dashboard.add_new',
                isVisible: true,
                path: ConstantList.ROOT_PATH + 'list/createStaff',
                icon: 'groupAdd',
            },
            {
                name: 'Dashboard.manage',
                isVisible: true,
                path: ConstantList.ROOT_PATH + 'list/updateHappenings',
                icon: 'folderShared',
            },
            {
                name: 'Dashboard.end',
                isVisible: true,
                path: ConstantList.ROOT_PATH + 'list/endStaff',
                icon: 'notificationsOff',
            },
        ],
    },
];
