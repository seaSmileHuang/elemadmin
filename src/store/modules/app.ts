import Cookies from "js-cookie";
import { RouteRecordRaw } from "vue-router";
import { Commit } from "vuex";

type State = {
	sidebar: {
		opened: boolean
	},
	device: string;
	tagViews: RouteRecordRaw[]
}
const app = {
	state(){
		return {
			sidebar: {
				opened: Cookies.get("sidebarStatus") ? !!Cookies.get("sidebarStatus") :false,
			},
			tagViews:[],
			device: "desktop"
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
		},
		CLOSE_SIDEBAR: (state: State) => {
			state.sidebar.opened = true;
			Cookies.set("sidebarStatus", '1')
		},
		ADD_TAG_VIEW(state: State, tag: RouteRecordRaw) {
			state.tagViews.push(tag)
		},
		DELETE_TAG_VIEW(state: State, tag:RouteRecordRaw){
			const index = state.tagViews.findIndex((item) => tag.path === item.path)
			if (index !== -1) {
				state.tagViews.splice(index, 1)
			}
		},
		SET_DEVICE(state:State , device: string) {
			state.device = device
		}
	},
	actions: {
		toggleSidebar({commit}: {commit: Commit}) {
			commit("TOGGLE_SIDEBAR")
		},
		closeSidebar({commit}: {commit: Commit}) {
			commit("CLOSE_SIDEBAR")
		},
		addTagViews({commit}, tag) {
			commit("ADD_TAG_VIEW", tag)
		},
		deleteTagView({commit}, tag) {
			commit("DELETE_TAG_VIEW", tag)
		},
		setDevice({commit}, device) {
			commit("SET_DEVICE", device)
		}
	},
}
export default app