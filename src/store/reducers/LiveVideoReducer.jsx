import {
    VIDEO_CALL_BROADCAST_START,
    VIDEO_CALL_BROADCAST_SUCCESS,
    VIDEO_CALL_BROADCAST_FAILURE,
    FETCH_LIVE_VIDEOS_START,
    FETCH_LIVE_VIDEOS_SUCCESS,
    FETCH_LIVE_VIDEOS_FAILURE,
    FETCH_LIVE_VIDEOS_HISTORY_START,
    FETCH_LIVE_VIDEOS_HISTORY_SUCCESS,
    FETCH_LIVE_VIDEOS_HISTORY_FAILURE,
    JOIN_LIVE_VIDEOS_START,
    JOIN_LIVE_VIDEOS_SUCCESS,
    JOIN_LIVE_VIDEOS_FAILURE,
    FETCH_SINGLE_LIVE_VIDEOS_START,
    FETCH_SINGLE_LIVE_VIDEOS_SUCCESS,
    FETCH_SINGLE_LIVE_VIDEOS_FAILURE,
    LIVE_VIDEOS_PAYMENT_BY_STRIPE_START,
    LIVE_VIDEOS_PAYMENT_BY_STRIPE_SUCCESS,
    LIVE_VIDEOS_PAYMENT_BY_STRIPE_FAILURE,
    LIVE_VIDEOS_PAYMENT_BY_PAYPAL_START,
    LIVE_VIDEOS_PAYMENT_BY_PAYPAL_SUCCESS,
    LIVE_VIDEOS_PAYMENT_BY_PAYPAL_FAILURE,
    LIVE_VIDEOS_VIEWER_UPDATE_START,
    LIVE_VIDEOS_VIEWER_UPDATE_SUCCESS,
    LIVE_VIDEOS_VIEWER_UPDATE_FAILURE,
    LIVE_VIDEOS_END_START,
    LIVE_VIDEOS_END_SUCCESS,
    LIVE_VIDEOS_END_FAILURE,
    LIVE_VIDEOS_PAYMENT_BY_WALLET_START,
    LIVE_VIDEOS_PAYMENT_BY_WALLET_SUCCESS,
    LIVE_VIDEOS_PAYMENT_BY_WALLET_FAILURE,
} from "../actions/ActionConstant";
  
const initialState = {
    saveLiveVideo: {
        data: {},
        loading: true,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
    },
    joinliveVideo: {
        data: {},
        loading: true,
        error: false,
        inputData: {},
        buttonDisable: false,
        loadingButtonContent: null,
    },
    singleLiveVideo: {
        data: {},
        loading: true,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
    },
    liveVideos: {
        data: {
            videos: [],
        },
        loading: true,
        error: false,
        skip: 0,
        length: 0,
    },
    liveVideosHistory: {
        data: {
            videos: [],
        },
        loading: true,
        error: false,
        skip: 0,
        length: 0,
    },
    liveWallet: {
        data: {},
        loading: true,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
    },
    liveStripe: {
        data: {},
        loading: true,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
    },
    livePaypal: {
        data: {},
        loading: true,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
    },
    liveViewerUpdate: {
        data: {},
        loading: true,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
    },
    liveEnd: {
        data: {},
        loading: true,
        error: false,
        inputData: {},
        loadingButtonContent: null,
        buttonDisable: false,
    },
};
  
const LiveVideoReducer = (state = initialState, action) => {
    switch (action.type) {
        case VIDEO_CALL_BROADCAST_START:
            return {
                ...state,
                saveLiveVideo: {
                    data: {},
                    loading: true,
                    error: false,
                    inputData: action.data,
                    loadingButtonContent: "Loading... Please wait.",
                    buttonDisable: true,
                },
            };
        case VIDEO_CALL_BROADCAST_SUCCESS:
            return {
                ...state,
                saveLiveVideo: {
                    data: action.data,
                    loading: false,
                    error: false,
                    inputData: {},
                    loadingButtonContent: null,
                    buttonDisable: false,
                },
            };
        case VIDEO_CALL_BROADCAST_FAILURE:
            return {
                ...state,
                saveLiveVideo: {
                    data: {},
                    loading: true,
                    error: action.error,
                    inputData: {},
                    loadingButtonContent: null,
                    buttonDisable: false,
                },
            };
        case FETCH_LIVE_VIDEOS_START:
            return {
                ...state,
                liveVideos: {
                    data: {
                        videos: [...state.liveVideos.data.videos],
                    },
                    loading: true,
                    error: false,
                    skip: state.liveVideos.skip,
                    length: state.liveVideos.length,
                },
            };
        case FETCH_LIVE_VIDEOS_SUCCESS:
            return {
                ...state,
                liveVideos: {
                    data: action.data,
                    data: {
                        videos: [...state.liveVideos.data.videos, ...action.data.live_videos],
                    },
                    loading: false,
                    error: false,
                    skip: action.data.live_videos.length + state.liveVideos.skip,
                    length: action.data.live_videos.length,
                },
            };
        case FETCH_LIVE_VIDEOS_FAILURE:
            return {
                ...state,
                liveVideos: {
                    data: {},
                    loading: false,
                    error: action.error,
                    skip: state.liveVideos.skip,
                    length: state.liveVideos.length,
                },
            };
        case FETCH_LIVE_VIDEOS_HISTORY_START:
            return {
                ...state,
                liveVideosHistory: {
                    data: {
                        videos: [...state.liveVideosHistory.data.videos],
                    },
                    loading: true,
                    error: false,
                    skip: state.liveVideosHistory.skip,
                    length: state.liveVideosHistory.length,
                },
            };
        case FETCH_LIVE_VIDEOS_HISTORY_SUCCESS:
            return {
                ...state,
                liveVideosHistory: {
                    data: action.data,
                    data: {
                        videos: [...state.liveVideosHistory.data.videos, ...action.data.live_videos],
                    },
                    loading: false,
                    error: false,
                    skip: action.data.live_videos.length + state.liveVideosHistory.skip,
                    length: action.data.live_videos.length,
                },
            };
        case FETCH_LIVE_VIDEOS_HISTORY_FAILURE:
            return {
                ...state,
                liveVideosHistory: {
                    data: {},
                    loading: false,
                    error: action.error,
                    skip: state.liveVideosHistory.skip,
                    length: state.liveVideosHistory.length,
                },
            };

        case FETCH_SINGLE_LIVE_VIDEOS_START:
            return {
                ...state,
                singleLiveVideo: {
                    inputData: action.data,
                    data: {},
                    loading: true,
                    error: false,
                    loadingButtonContent: "Loading... Please wait",
                    buttonDisable: true,
                },
            };
        case FETCH_SINGLE_LIVE_VIDEOS_SUCCESS:
            return {
                ...state,
                singleLiveVideo: {
                    data: action.data,
                    loading: false,
                    error: false,
                    inputData: {},
                    loadingButtonContent: null,
                    buttonDisable: false,
                },
            };
        case FETCH_SINGLE_LIVE_VIDEOS_FAILURE:
            return {
                ...state,
                singleLiveVideo: {
                    data: {},
                    loading: true,
                    error: action.error,
                    inputData: {},
                    loadingButtonContent: null,
                    buttonDisable: false,
                },
            };
        case JOIN_LIVE_VIDEOS_START:
            return {
                ...state,
                joinliveVideo: {
                    inputData: action.data,
                    loading: true,
                    error: false,
                    data: {},
                    buttonDisable: true,
                    loadingButtonContent: "Loading... Please wait",
                },
            };
        case JOIN_LIVE_VIDEOS_SUCCESS:
            return {
                ...state,
                joinliveVideo: {
                    data: action.data,
                    loading: false,
                    error: false,
                    inputData: {},
                    buttonDisable: false,
                    loadingButtonContent: null,
                },
            };
        case JOIN_LIVE_VIDEOS_FAILURE:
            return {
                ...state,
                joinliveVideo: {
                    data: {},
                    loading: true,
                    error: action.error,
                    inputData: {},
                    buttonDisable: false,
                    loadingButtonContent: null,
                },
            };
        case LIVE_VIDEOS_PAYMENT_BY_STRIPE_START:
            return {
                ...state,
                liveStripe: {
                    data: {},
                    loading: true,
                    error: false,
                    inputData: action.data,
                    loadingButtonContent: "Loading... Please wait.",
                    buttonDisable: true,
                },
            };
        case LIVE_VIDEOS_PAYMENT_BY_STRIPE_SUCCESS:
            return {
                ...state,
                liveStripe: {
                    data: action.data,
                    loading: false,
                    error: false,
                    inputData: {},
                    loadingButtonContent: null,
                    buttonDisable: false,
                },
            };
        case LIVE_VIDEOS_PAYMENT_BY_STRIPE_FAILURE:
            return {
                ...state,
                liveStripe: {
                    data: {},
                    loading: true,
                    error: action.error,
                    inputData: {},
                    loadingButtonContent: null,
                    buttonDisable: false,
                },
            };
        case LIVE_VIDEOS_PAYMENT_BY_PAYPAL_START:
            return {
                ...state,
                livePaypal: {
                    data: {},
                    loading: true,
                    error: false,
                    inputData: action.data,
                    loadingButtonContent: "Loading... Please wait.",
                    buttonDisable: true,
                },
            };
        case LIVE_VIDEOS_PAYMENT_BY_PAYPAL_SUCCESS:
            return {
                ...state,
                livePaypal: {
                    data: action.data,
                    loading: false,
                    error: false,
                    inputData: {},
                    loadingButtonContent: null,
                    buttonDisable: false,
                },
            };
        case LIVE_VIDEOS_PAYMENT_BY_PAYPAL_FAILURE:
            return {
                ...state,
                livePaypal: {
                    data: {},
                    loading: true,
                    error: action.error,
                    inputData: {},
                    loadingButtonContent: null,
                    buttonDisable: false,
                },
            };
        case LIVE_VIDEOS_VIEWER_UPDATE_START:
            return {
                ...state,
                liveViewerUpdate: {
                    data: {},
                    loading: true,
                    error: false,
                    inputData: action.data,
                    loadingButtonContent: "Loading... Please wait.",
                    buttonDisable: true,
                },
            };
        case LIVE_VIDEOS_VIEWER_UPDATE_SUCCESS:
            return {
                ...state,
                liveViewerUpdate: {
                    data: action.data,
                    loading: false,
                    error: false,
                    inputData: {},
                    loadingButtonContent: null,
                    buttonDisable: false,
                },
            };
        case LIVE_VIDEOS_VIEWER_UPDATE_FAILURE:
            return {
                ...state,
                liveViewerUpdate: {
                    data: {},
                    loading: true,
                    error: action.error,
                    inputData: {},
                    loadingButtonContent: null,
                    buttonDisable: false,
                },
            };
        case LIVE_VIDEOS_END_START:
            return {
                ...state,
                liveEnd: {
                    data: {},
                    loading: true,
                    error: false,
                    inputData: action.data,
                    loadingButtonContent: "Loading... Please wait.",
                    buttonDisable: true,
                },
            };
        case LIVE_VIDEOS_END_SUCCESS:
            return {
                ...state,
                liveEnd: {
                    data: action.data,
                    loading: false,
                    error: false,
                    inputData: {},
                    loadingButtonContent: null,
                    buttonDisable: false,
                },
            };
        case LIVE_VIDEOS_END_FAILURE:
            return {
                ...state,
                liveEnd: {
                    data: {},
                    loading: true,
                    error: action.error,
                    inputData: {},
                    loadingButtonContent: null,
                    buttonDisable: false,
                },
            };
        case LIVE_VIDEOS_PAYMENT_BY_WALLET_START:
            return {
                ...state,
                liveWallet: {
                    data: {},
                    loading: true,
                    error: false,
                    inputData: action.data,
                    loadingButtonContent: "Loading... Please wait.",
                    buttonDisable: true,
                },
            };
        case LIVE_VIDEOS_PAYMENT_BY_WALLET_SUCCESS:
            return {
                ...state,
                liveWallet: {
                    data: action.data,
                    loading: false,
                    error: false,
                    inputData: {},
                    loadingButtonContent: null,
                    buttonDisable: false,
                },
            };
        case LIVE_VIDEOS_PAYMENT_BY_WALLET_FAILURE:
            return {
                ...state,
                liveWallet: {
                    data: {},
                    loading: true,
                    error: action.error,
                    inputData: {},
                    loadingButtonContent: null,
                    buttonDisable: false,
                },
            };
    
      default:
        return state;
    }
  };
  
  export default LiveVideoReducer;
  