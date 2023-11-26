import { Flex, VStack, Text } from '@chakra-ui/layout';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { resetPasswordSchema } from '@feedstein/validation';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useResetPassword } from '../../api/auth-api';
import { AuthLayout } from '../../layouts/auth-layout';

export interface ResetPasswordPageProps {}

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = () => {
  const { mutateAsync: resetPassword, isSuccess } = useResetPassword();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    }
  }, [isSuccess, navigate]);

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: async (data, formikHelpers) => {
      try {
        await resetPassword({ ...data, token });
        formikHelpers.resetForm({});
      } catch {
        alert('Error');
      }
    },
    validationSchema: resetPasswordSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });
  return (
    <AuthLayout description="The Ultimate RSS feed aggregator">
      <Flex justify="center" align="center" height="100%">
        <VStack
          align="flex-start"
          justify="center"
          minWidth={500}
          shouldWrapChildren
          sx={{
            '> div': { width: '100%' },
          }}
        >
          <Text fontSize="4xl" marginBottom={5}>
            Forget Password
          </Text>
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              marginBottom={5}
              isInvalid={Boolean(formik.errors.password)}
            >
              <FormLabel htmlFor="password">Your Password</FormLabel>
              <Input
                type="password"
                id="password"
                name="password"
                variant="solid-white"
                paddingX={6}
                paddingY={7}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password ? (
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              ) : null}
            </FormControl>

            <Button type="submit" colorScheme="primary" display="block">
              Update password
            </Button>
          </form>
        </VStack>
      </Flex>
    </AuthLayout>
  );
};
