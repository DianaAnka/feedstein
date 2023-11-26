import { Flex, VStack, Text } from '@chakra-ui/layout';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { forgetPasswordSchema } from '@feedstein/validation';
import { useFormik } from 'formik';
import React from 'react';
import { useForgetPassword } from '../../api/auth-api';
import { AuthLayout } from '../../layouts/auth-layout';

export interface ForgetPasswordPageProps {}

export const ForgetPasswordPage: React.FC<ForgetPasswordPageProps> = () => {
  const { mutateAsync: forgetPassword } = useForgetPassword();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (data, formikHelpers) => {
      try {
        await forgetPassword(data);
        formikHelpers.resetForm({});
      } catch {
        alert('Error');
      }
    },
    validationSchema: forgetPasswordSchema,
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

            <Button type="submit" colorScheme="primary" display="block">
              Send email
            </Button>
          </form>
        </VStack>
      </Flex>
    </AuthLayout>
  );
};
