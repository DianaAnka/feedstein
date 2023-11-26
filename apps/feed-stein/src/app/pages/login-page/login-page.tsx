import { Flex, VStack, Text, Box } from '@chakra-ui/layout';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { loginUserSchema } from '@feedstein/validation';
import { useFormik } from 'formik';
import React from 'react';
import { useLoginUser } from '../../api/auth-api';
import { AuthLayout } from '../../layouts/auth-layout';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';

export interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
  const { mutateAsync: loginUser,isSuccess,data:responseData } = useLoginUser();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (data, formikHelpers) => {
      try {
       const response = await loginUser(data);
       console.log(response);
        formikHelpers.resetForm({});
        if(isSuccess){
          console.log("here"+"fff"+responseData);
          
          // localStorage.setItem('token',);
        navigate('/login');
        }
      } catch {
        alert('Error');
      }
    },
    validationSchema: loginUserSchema,
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
            Sign in
          </Text>
          <Text fontSize="1l" marginBottom={5}>
            Don't have an account? 
            <ChakraLink as={ReactRouterLink} to="/register"> Sign up
            </ChakraLink>
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
              Login
            </Button>
            <Box display="flex" justifyContent="flex-end">
              <ChakraLink as={ReactRouterLink} to="/reset-password">
                Forget my password
              </ChakraLink>
            </Box>
          </form>
        </VStack>
      </Flex>
    </AuthLayout>
  );
};
