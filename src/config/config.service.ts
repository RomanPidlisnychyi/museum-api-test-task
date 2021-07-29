import { config } from 'dotenv';
config();

export const configService = (() => {
  const requiredEnvKey = ['PORT'];
  requiredEnvKey.forEach((requiredKey: string) => {
    if (!process.env[requiredKey]) {
      throw new Error(`config error - missing env.${requiredKey}`);
    }
  });

  const getPort = (): number => parseInt(process.env.PORT);

  return {
    getPort,
  };
})();
