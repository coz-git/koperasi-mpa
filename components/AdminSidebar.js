import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from '../context/menuContext';

const AppSidebar = () => {
  const model = [
    {
      label: 'Home',
      items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/admin/dashboard' }],
    },
    {
      label: 'UI Components',
      items: [
        {
          label: 'User Management',
          icon: 'pi pi-fw pi-users',
          to: '/admin/user',
        },
        {
          label: 'Form Layout',
          icon: 'pi pi-fw pi-id-card',
          to: '/admin/oke',
        },
        {
          label: 'Input',
          icon: 'pi pi-fw pi-check-square',
          to: '/admin/coba',
        },
      ],
    },
    {
      label: 'Hierarchy',
      items: [
        {
          label: 'Submenu 1',
          icon: 'pi pi-fw pi-bookmark',
          items: [
            {
              label: 'Submenu 1.1',
              icon: 'pi pi-fw pi-bookmark',
              items: [
                {
                  label: 'Submenu 1.1.1',
                  icon: 'pi pi-fw pi-bookmark',
                  to: '/admin/submenu',
                },
                {
                  label: 'Submenu 1.1.2',
                  icon: 'pi pi-fw pi-bookmark',
                },
                {
                  label: 'Submenu 1.1.3',
                  icon: 'pi pi-fw pi-bookmark',
                },
              ],
            },
            {
              label: 'Submenu 1.2',
              icon: 'pi pi-fw pi-bookmark',
              items: [
                {
                  label: 'Submenu 1.2.1',
                  icon: 'pi pi-fw pi-bookmark',
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppSidebar;
