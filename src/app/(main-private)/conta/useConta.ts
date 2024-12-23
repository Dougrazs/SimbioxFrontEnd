import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { IUser } from '@/types/userType';
import { useQueryClient } from '@tanstack/react-query';
import { API_URL } from '@/constants/urls';
export const useConta = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser: IUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user from localStorage', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }
  }, []);


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

        const response = await fetch(`${API_URL}/user/${userId}`);
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
    const response = await fetch(`${API_URL}/user/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: form.name, email: form.email }),
    });

    document.cookie = 'auth_token_simbiox=; Max-Age=0; path=/;'
    localStorage.removeItem('user');
    router.push('/signin');
    return response;
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/user/update`, {
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

      router.push('/signin');
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    document.cookie = 'auth_token_simbiox=; Max-Age=0; path=/;'
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
