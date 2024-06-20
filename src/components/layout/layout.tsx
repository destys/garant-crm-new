import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined, DashboardOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

import { useAuth } from '../../context/auth-context';

const { Header, Content, Footer, Sider } = Layout;

interface ILayoutComponent {
    children: ReactNode
}

const LayoutComponent: React.FC<ILayoutComponent> = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const items = [{
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: `Все заявки`,
        path: `/`
    },
    {
        key: 'masters',
        icon: <TeamOutlined />,
        label: `Мастера`,
        path: `/masters`
    }]

    const handleClick = (e: { key: string; }) => {
        const item = items.find(item => item.key === e.key);
        if (item) {
            if (isMobile) {
                setCollapsed(true); // Закрываем Sider после перехода только на мобильных устройствах
            }
            navigate(item.path);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 991);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    return (
        <Layout className="min-h-[100vh]">
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                collapsed={collapsed} onCollapse={setCollapsed}
            >
                <div className="flex justify-center mb-10 demo-logo-vertical">
                    <img src="/images/logo.png" alt="" className="max-h-40" />
                </div>
                <Menu onClick={handleClick} theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout className="flex flex-col">
                <Header className="flex justify-between items-center mx-4 px-3 lg:px-6 !rounded-t-none" style={{
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}>
                    <Button>Создать заявку</Button>
                    <div className="flex gap-2">
                        <Button icon={<UserOutlined />} onClick={() => navigate('/profile')}>Профиль</Button>
                        <Button icon={<LogoutOutlined />} danger onClick={logout}>Выход</Button>
                    </div>
                </Header>
                <Content className="mt-6 mx-4 flex-auto ">
                    <div className="h-full p-3 lg:p-6"
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Some Development ©{new Date().getFullYear()} Created by Some Development
                </Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutComponent;