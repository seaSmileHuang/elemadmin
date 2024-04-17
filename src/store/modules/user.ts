import UserApi, { IUserInfoItem, IUserItem } from "@/api/user";
import { asyncify } from "@/utils/extractData";
import { Commit } from "vuex";

type State = {
	user: IUserItem;
	roles: string[]
}
const user = {
	state: {
		user: {},
		roles: []
	},
	mutations: {
		SET_ROLES(state:State, role: string[]) {
			state.roles = role
		},
		SET_USERS(state: State, user: IUserItem) {
			state.user = user
		}
	},
	action: {
		// 获取用户信息
		async GetInfo({commit}: {commit: Commit}) {
			const res = await asyncify(() => UserApi.getUserInfo())()
			setUserInfo(res, commit)
		}
	}
}

const setUserInfo = (res:IUserInfoItem, commit: Commit) => {
	commit("SET_ROLES", res.roles || [])
	commit("SET_USERS", res.user || [])
}
export default user;