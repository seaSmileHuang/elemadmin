import Cookies from "js-cookie";
import { Commit } from "vuex";

type State = {
	sidebar: {
		opened: boolean
	}
}
const app = {
	state(){
		return {
			sidebar: {
				opened: Cookies.get("sidebarStatus") ? !!Cookies.get("sidebarStatus") :true,
			}
		}

	},
	mutations: {
		TOGGLE_SIDEBAR: (state: State) => {
			state.sidebar.opened = !state.sidebar.opened;
			if (state.sidebar.opened) {
				Cookies.set("sidebarStatus", "1")
			} else {
				Cookies.set("sidebarStatus", '0')
			}
		}
	},
	actions: {
		toggleSidebar({commit}: {commit: Commit}) {
			commit("TOGGLE_SIDEBAR")
		}
	}
}
export default app