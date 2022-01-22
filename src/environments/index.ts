export interface Env {
    production: boolean;
    env: 'dev' | 'prod';

    moralis: {
        /** Moralis Application ID */
        appId: string;
        /** Moralis Server URL */
        serverUrl: string;
    };
}