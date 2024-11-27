import { redirect } from 'next/navigation';

const Admin = () => {
  const isAuth = false
  if (!isAuth) {
    redirect('/signin');
  }

  return (
    <main>
    </main>
  );
};

export default Admin;