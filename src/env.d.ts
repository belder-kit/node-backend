declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SKIP_GENERATE_NEXUS?: boolean;
      DATABASE_URL: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
    }
  }
}

export {};
