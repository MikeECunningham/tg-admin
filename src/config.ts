interface IConfig {
    baseURL: string;
    version: number;
    facebookAppId: string;
}
const config: IConfig = {
    //baseURL: 'https://tgserver.forgetech.ca',
    //baseURL: 'https://server.turtleguardians.com',
    baseURL: "http://localhost:8080",
    version: 1,
    facebookAppId: "2318054821808468"
};
export default config;