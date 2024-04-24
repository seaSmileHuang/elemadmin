import Cookies from "js-cookie";
import { RouteRecordRaw } from "vue-router";
import { Commit } from "vuex";

type State = {
	sidebar: {
		opened: boolean
	},
	tagsView: RouteRecordRaw[]
}
const app = {
	state(){
		return {
			sidebar: {
				opened: Cookies.get("sidebarStatus") ? !!Cookies.get("sidebarStatus") :true,
			},
			tagsView:[]
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
		ADD_TAG_VIEW(state: State, tag: RouteRecordRaw) {
			state.tagsView.push(tag)
		},
		DELETE_TAG_VIEW(state: State, tag:RouteRecordRaw){
			const index = state.tagsView.findIndex((item) => tag.path === item.path)
			if (index !== -1) {
				state.tagsView.splice(index, 1)
			}
		}
	},
	actions: {
		toggleSidebar({commit}: {commit: Commit}) {
			commit("TOGGLE_SIDEBAR")
		},
		addTagViews({commit}, tag) {
			commit("ADD_TAG_VIEW", tag)
		},
		deleteTagView({commit}, tag) {
			commit("DELETE_TAG_VIEW", tag)
		}
	}
}
export default app