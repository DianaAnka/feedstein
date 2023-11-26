import { Flex, VStack, Text } from '@chakra-ui/layout';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { registerUserSchema } from '@feedstein/validation';
import { useFormik } from 'formik';
import React from 'react';
import { useRegisterUser } from '../../api/auth-api';
import { AuthLayout } from '../../layouts/auth-layout';

export interface RegisterPageProps {}

export const RegisterPage: React.FC<RegisterPageProps> = () => {
  const { mutateAsync: registerUser } = useRegisterUser();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (data, formikHelpers) => {
      try {
        await registerUser(data);
        formikHelpers.resetForm({});
      } catch {
        alert('Error');
      }
    },
    validationSchema: registerUserSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });
  return (
    <AuthLayout description="Expense Tracker">
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
            Sign up
          </Text>
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              marginBottom={5}
              isInvalid={Boolean(formik.errors.email)}
            >
              <FormLabel htmlFor="email">Your Email</FormLabel>
              <Input
                type="email"
                id="email"
                name="email"
                variant="solid-white"
                paddingX={6}
                paddingY={7}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email ? (
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              ) : null}
            </FormControl>
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
              Register
            </Button>
          </form>
        </VStack>
      </Flex>
    </AuthLayout>
  );
};
