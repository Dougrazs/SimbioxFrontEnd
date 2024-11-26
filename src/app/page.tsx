import { redirect } from 'next/navigation';

const Admin = () => {
  const isAuth = false
  if (!isAuth) {
    redirect('/signin');
  }

  return (
    <main className="text-center h-screen flex justify-center items-center">
      <div>
        <h1>Admin Page</h1>
      </div>
    </main>
  );
};

export default Admin;
