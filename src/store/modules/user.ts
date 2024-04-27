import LoginApi, { LoginParams } from "@/api/login";
import UserApi, { IUserInfoItem, IUserItem } from "@/api/user";
import config from "@/config";
import router from "@/router";
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
	actions: {
		// 获取用户信息
		async GetUserInfo({commit}: {commit: Commit}) {
			const res = await asyncify(() => LoginApi.getUserInfo())()
			setUserInfo(res, commit)
		},
		async login({commit}: {commit: Commit}, params: LoginParams) {
			const token = await asyncify(() => LoginApi.login(params))()
			if (token) {
				commit("SET_TOKEN", token)
				Cookies.set("token", token, {expires: config.maxTokenExpires})
			}
		},
		async logout({commit}: {commit: Commit}) {
			await asyncify(() => LoginApi.logout())()
			commit("SET_ROLES", [])
			commit("SET_USERS", {})
			commit("SET_TOKEN", undefined)
			Cookies.remove("token")
			router.replace("/login")
		}
	}
}

const setUserInfo = (res:IUserInfoItem, commit: Commit) => {
	commit("SET_ROLES", res.roles || [])
	commit("SET_USERS", res.user || [])
}
export default user;