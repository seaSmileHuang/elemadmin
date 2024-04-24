import LoginApi from "@/api/login";
import UserApi, { IUserInfoItem, IUserItem } from "@/api/user";
import config from "@/config";
import { asyncify } from "@/utils/extractData";
import { getToken } from "@/utils/getToken.ts";
import Cookies from "js-cookie";
import { Commit } from "vuex";
type State = {
	user: IUserItem;
	roles: string[];
	token?: string;
}
const user = {
	state() {
		return {
			user: {},
			roles: [],
			token: getToken() ,
		}
	},
	mutations: {
		SET_ROLES(state:State, role: string[]) {
			state.roles = role
		},
		SET_USERS(state: State, user: IUserItem) {
			state.user = user
		},
		SET_TOKEN(state: State, token: string) {
			state.token = token
		}
	},
	action: {
		// 获取用户信息
		async GetInfo({commit}: {commit: Commit}) {
			const res = await asyncify(() => UserApi.getUserInfo())()
			setUserInfo(res, commit)
		},
		async login({commit}, params: string) {
			const res = await asyncify(() => LoginApi.login(params))()
			setUserInfo(res, commit)
			
		},
		async logout({commit}) {
			await asyncify(() => LoginApi.loginout())()
			commit("SET_ROLES", [])
			commit("SET_USERS", {})
			commit("SET_TOKEN", undefined)
			Cookies.remove("token")
		}
	}
}

const setUserInfo = (res:IUserInfoItem, commit: Commit) => {
	commit("SET_ROLES", res.roles || [])
	commit("SET_USERS", res.user || [])
	if (res.token) {
		commit("SET_TOKEN", res.token)
		Cookies.set("token", res.token, {expires: config.maxTokenExpires})
	}

}
export default user;