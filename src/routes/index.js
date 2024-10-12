import Login from '@/pages/auth/login'
import NotAuthorized from '@/pages/auth/not-authorized'
import Dashboard from '@/pages/Dashboard/Dashboard'
import ViolationTable from '@/pages/Tables/violationTable'
import Map from '@/pages/Map/map'

import LoginLayout from '@/layout/auth/login-layout'
import OTPAuth from '@/pages/auth/OTP_auth'

const publicRoutes = [
    {path: '/', element: Dashboard},
    {path: '/violations', element: ViolationTable},
    {path: '/login', element: Login, Layout: LoginLayout},
    {path: '/not-authorized', element: NotAuthorized, Layout: LoginLayout},
    {path: '/OTP', element: OTPAuth, Layout: LoginLayout},
]

// "roles" trong này do mình tự quyết định nó phân quyền cho đối tượng nào được truy cập vào route này
const privateRoutes = [
    {path: '/admin/violation-history', element: ViolationTable, roles: ['admin']},
    {path: '/admin/map', element: Map, roles: ['admin']},
    {path: '/admin/realtime-violation', element: ViolationTable, roles: ['admin']},
]

export { publicRoutes, privateRoutes }