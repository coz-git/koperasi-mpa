import { LayoutProvider } from '../../context/layoutcontext';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../../styles/layout/layout.scss';
import AdminLayout from '../../components/AdminLayout';
import '../../public/themes/lara-light-blue/theme.css';

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
