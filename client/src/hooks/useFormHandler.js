export const useFormHandler = (api, { onSuccess, resetFields }) => {
  return async (values, formikHelpers) => {
    const { setStatus, setFieldValue } = formikHelpers;

    try {
      const res = await api(values);
      onSuccess?.(res);
    } catch (err) {
      setStatus(err.response?.data?.error || "Something went wrong");
      resetFields?.(setFieldValue);
    }
  };
};
