import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/constants/urls";

export const useSignin = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token') ?? '';

    if (!token) {
      setError('Token is missing');
      setLoading(false);
      return;
    }

    const validateToken = async () => {
      try {
        const response = await fetch(`${API_URL}/protectedroute`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Token validation failed');
        }
        console.log('passou o token: ', { token })
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data?.user));
        router.push('/destaques');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [router]);

  const handleIsSignup = () => {
    setIsSignup(prev => !prev);
  };

  return { loading, error, handleIsSignup, isSignup };
};
