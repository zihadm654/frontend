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
} from "./ActionConstant";
  
export function videoCallBroadcastStart(data) {
    return {
        type: VIDEO_CALL_BROADCAST_START,
        data,
    };
}
  
export function videoCallBroadcastSuccess(data) {
    return {
        type: VIDEO_CALL_BROADCAST_SUCCESS,
        data,
    };
}
  
export function videoCallBroadcastFailure(error) {
    return {
        type: VIDEO_CALL_BROADCAST_FAILURE,
        error,
    };
}

export function fetchLiveVideosStart(data) {
    return {
        type: FETCH_LIVE_VIDEOS_START,
        data,
    };
}
  
export function fetchLiveVideosSuccess(data) {
    return {
        type: FETCH_LIVE_VIDEOS_SUCCESS,
        data,
    };
}
  
export function fetchLiveVideosFailure(error) {
    return {
        type: FETCH_LIVE_VIDEOS_FAILURE,
        error,
    };
}

export function fetchLiveVideosHistoryStart(data) {
    return {
        type: FETCH_LIVE_VIDEOS_HISTORY_START,
        data,
    };
}
  
export function fetchLiveVideosHistorySuccess(data) {
    return {
        type: FETCH_LIVE_VIDEOS_HISTORY_SUCCESS,
        data,
    };
}
  
export function fetchLiveVideosHistoryFailure(error) {
    return {
        type: FETCH_LIVE_VIDEOS_HISTORY_FAILURE,
        error,
    };
}


export function joinLiveVideosStart(data) {
    return {
        type: JOIN_LIVE_VIDEOS_START,
        data,
    };
}
  
export function joinLiveVideosSuccess(data) {
    return {
        type: JOIN_LIVE_VIDEOS_SUCCESS,
        data,
    };
}
  
export function joinLiveVideosFailure(error) {
    return {
        type: JOIN_LIVE_VIDEOS_FAILURE,
        error,
    };
}



export function fetchSingleLiveVideoStart(data) {
    return {
        type: FETCH_SINGLE_LIVE_VIDEOS_START,
        data,
    };
}
  
export function fetchSingleLiveVideoSuccess(data) {
    return {
        type: FETCH_SINGLE_LIVE_VIDEOS_SUCCESS,
        data,
    };
}
  
export function fetchSingleLiveVideoFailure(error) {
    return {
        type: FETCH_SINGLE_LIVE_VIDEOS_FAILURE,
        error,
    };
}

export function livePaymentPaypalStart(data) {
    return {
        type: LIVE_VIDEOS_PAYMENT_BY_PAYPAL_START,
        data,
    };
}
  
export function livePaymentPaypalSuccess(data) {
    return {
        type: LIVE_VIDEOS_PAYMENT_BY_PAYPAL_SUCCESS,
        data,
    };
}
  
export function livePaymentPaypalFailure(error) {
    return {
        type: LIVE_VIDEOS_PAYMENT_BY_PAYPAL_FAILURE,
        error,
    };
}

export function livePaymentStripeStart(data) {
    return {
        type: LIVE_VIDEOS_PAYMENT_BY_STRIPE_START,
        data,
    };
}
  
export function livePaymentStripeSuccess(data) {
    return {
        type: LIVE_VIDEOS_PAYMENT_BY_STRIPE_SUCCESS,
        data,
    };
}
  
export function livePaymentStripeFailure(error) {
    return {
        type: LIVE_VIDEOS_PAYMENT_BY_STRIPE_FAILURE,
        error,
    };
}

export function liveViewerUpdateStart(data) {
    return {
        type: LIVE_VIDEOS_VIEWER_UPDATE_START,
        data,
    };
}
  
export function liveViewerUpdateSuccess(data) {
    return {
        type: LIVE_VIDEOS_VIEWER_UPDATE_SUCCESS,
        data,
    };
}
  
export function liveViewerUpdateFailure(error) {
    return {
        type: LIVE_VIDEOS_VIEWER_UPDATE_FAILURE,
        error,
    };
}


export function liveVideoEndStart(data) {
    return {
        type: LIVE_VIDEOS_END_START,
        data,
    };
}
  
export function liveVideoEndSuccess(data) {
    return {
        type: LIVE_VIDEOS_END_SUCCESS,
        data,
    };
}
  
export function liveVideoEndFailure(error) {
    return {
        type: LIVE_VIDEOS_END_FAILURE,
        error,
    };
}
export function livePaymentWalletStart(data) {
    return {
        type: LIVE_VIDEOS_PAYMENT_BY_WALLET_START,
        data,
    };
}
  
export function livePaymentWalletSuccess(data) {
    return {
        type: LIVE_VIDEOS_PAYMENT_BY_WALLET_SUCCESS,
        data,
    };
}
  
export function livePaymentWalletFailure(error) {
    return {
        type: LIVE_VIDEOS_PAYMENT_BY_WALLET_FAILURE,
        error,
    };
}
