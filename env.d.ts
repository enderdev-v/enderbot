declare global {
	namespace NodeJS {
		interface ProcessEnv {
			token: string;
			clientid: string;
			DATABASE_URL: string;
			webhookURL: string;
			webhookId: string;
			webhookToken: string;
		}
	}
}
export { }