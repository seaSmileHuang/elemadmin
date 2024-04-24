import config from "@/config";
import { JSEncrypt } from "jsencrypt";

const encryptor = new JSEncrypt()
encryptor.setPublicKey(config.publicKey)
const encrypt = (params: string): string => {
	return encryptor.encrypt(params) as string
}

export default encrypt;