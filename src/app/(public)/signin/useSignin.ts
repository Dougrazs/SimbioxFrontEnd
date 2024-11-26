import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
        const response = await fetch('http://localhost:3005/api/protectedroute', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Token validation failed');
        }

        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data?.user));

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        router.push('/destaques');
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
