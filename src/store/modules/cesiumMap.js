const state = {
    viewerparams: {
        lngLat: {
            lat: 39.917564357332,
            lng: 116.51424064636029
        },
        bearing: 0,
        zoom: 12
    },
    viewer: null,
    style: ''
}

const mutations = {
    INIT_VIEWER: (state, viewer) => {
        state.viewer = viewer
    },
    SETSTYLE: (state, url) => {
        state.style = url
    },
    SETMAPPARAMS: (state, viewerparams) => {
        state.viewerparams = viewerparams
    }
}

const actions = {
    initViewer({
        commit,
        state
    }, viewer) {
        commit('INIT_VIEWER', viewer)
    },
    setMapParams({
        commit,
        state
    }, viewerparams) {
        commit('SETMAPPARAMS', viewerparams)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
