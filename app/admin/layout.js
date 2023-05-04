import { LayoutProvider } from '../../context/layoutContext';
import '../../styles/layout/layout.scss';
import AdminLayout from '../../components/AdminLayout';

export const metadata = {
  title: 'Admin page',
  description: 'Created by Coz',
};

const layout = (props) => {
  return (
    <>
      <LayoutProvider>
        <AdminLayout>
          <div className="grid">
            <div className="col-12 xl:col-12">
              <div className="card">
                {props.children}
              </div>
            </div>
          </div>
        </AdminLayout>
      </LayoutProvider>
    </>
  );
};

export default layout;
