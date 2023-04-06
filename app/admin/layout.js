import { LayoutProvider } from '../../context/layoutContext';
import '../../styles/layout/layout.scss';
import AdminLayout from '../../components/AdminLayout';
import '../../public/themes/lara-light-blue/theme.css';

export const metadata = {
  title: 'Admin page',
  description: 'Created by Coz',
};

const layout = (props) => {
  return (
    <>
      <LayoutProvider>
        <AdminLayout>
          <div>{props.children}</div>
        </AdminLayout>
      </LayoutProvider>
    </>
  );
};

export default layout;
