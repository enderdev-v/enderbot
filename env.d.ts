declare global {
	namespace NodeJS {
		interface ProcessEnv {
			token: string;
			appID: string;
			DATABASE_URL: string;
			webhookURL: string;
			webhookId: string;
			webhookToken: string;
		}
	}
}
export { }