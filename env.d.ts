declare global {
	namespace NodeJS {
		interface ProcessEnv {
			token: string;
			clientid: string;
			mongo: string;
			webhookURL: string;
		}
	}
}
export { }