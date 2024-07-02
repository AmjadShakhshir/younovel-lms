module.exports = async () => {
  await (global as any).__REDIS__.quit();
};
