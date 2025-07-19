export const withErrorHandling = async (fn: () => Promise<any>, message: string) => {
  try {
    return await fn();
  } catch (err: any) {
    throw new Error(err.message || message);
  }
};
