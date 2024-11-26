import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { IUser } from '@/types/userType';
import { useQueryClient } from '@tanstack/react-query';
export const useConta = (user: IUser) => {
  const router = useRouter();
  const userId = user?._id;
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    name: '',
    email: '',
  });



  const { data, isLoading, isError, error } = useQuery(
    {
      queryKey: ['user', userId],
      queryFn: async () => {
        if (!userId) {
          throw new Error('User ID is required');
        }

        const response = await fetch(`http://localhost:3005/api/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        return response.json();
      },
      enabled: !!userId,
      refetchOnWindowFocus: true,
    }
  );



  useEffect(() => {
    if (data?.user) {
      setForm({ name: data.user.name, email: data.user.email });
    }
  }, [data]);


  const handleDeleteAccount = async () => {
    const response = await fetch('http://localhost:3005/api/user/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: form.name, email: form.email }),
    });

    return response;
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3005/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update the account');
      }
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      localStorage.removeItem('user');
      router.push('/signin');
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/signin');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return {
    handleDeleteAccount,
    handleLogout,
    handleUpdate,
    setForm,
    handleInputChange,
    form,
    isLoading,
    isError,
    error,
  };
};
