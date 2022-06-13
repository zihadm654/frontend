import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
    videoCallBroadcastFailure,
    videoCallBroadcastSuccess,
    fetchLiveVideosSuccess,
    fetchLiveVideosFailure,
    fetchLiveVideosHistorySuccess,
    fetchLiveVideosHistoryFailure,
    fetchSingleLiveVideoSuccess,
    fetchSingleLiveVideoFailure,
    joinLiveVideosSuccess,
    joinLiveVideosFailure,
    livePaymentPaypalSuccess,
    livePaymentPaypalFailure,
    livePaymentStripeSuccess,
    livePaymentStripeFailure,
    liveViewerUpdateSuccess,
    liveViewerUpdateFailure,
    liveVideoEndSuccess,
    liveVideoEndFailure,
    livePaymentWalletSuccess,
    livePaymentWalletFailure,
} from "../actions/LiveVideoAction";
import {
    VIDEO_CALL_BROADCAST_START,
    FETCH_LIVE_VIDEOS_START,
    FETCH_LIVE_VIDEOS_HISTORY_START,
    JOIN_LIVE_VIDEOS_START,
    FETCH_SINGLE_LIVE_VIDEOS_START,
    LIVE_VIDEOS_PAYMENT_BY_STRIPE_START,
    LIVE_VIDEOS_PAYMENT_BY_PAYPAL_START,
    LIVE_VIDEOS_VIEWER_UPDATE_START,
    LIVE_VIDEOS_END_START,
    LIVE_VIDEOS_PAYMENT_BY_WALLET_START,
} from "../actions/ActionConstant";

import {
  checkLogoutStatus,
} from "../actions/ErrorAction";

function* liveVideoSaveAPI() {
  try {
    const inputData = yield select((state) => state.liveVideo.saveLiveVideo.inputData);
    const response = yield api.postMethod("live_videos_broadcast_start", inputData);
    if (response.data.success) {
      yield put(videoCallBroadcastSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign(window.location.origin +"/join/" +response.data.data.live_video_unique_id);
    } else {
      yield put(videoCallBroadcastFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(videoCallBroadcastFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* liveVideosAPI() {
  try {
    const skipCount = yield select((state) => state.liveVideo.liveVideos.skip);
    const response = yield api.postMethod("live_videos", {
      skip: skipCount,
    });
    if (response.data.success) {
      yield put(fetchLiveVideosSuccess(response.data.data));
    } else {
      yield put(fetchLiveVideosFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchLiveVideosFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* liveVideosHistoryAPI() {
  try {
    const skipCount = yield select((state) => state.liveVideo.liveVideosHistory.skip);
    const response = yield api.postMethod("live_videos_owner_list", {
      skip: skipCount,
    });
    if (response.data.success) {
      yield put(fetchLiveVideosHistorySuccess(response.data.data));
    } else {
      yield put(fetchLiveVideosHistoryFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchLiveVideosHistoryFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchSingleLiveVideoAPI() {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.singleLiveVideo.inputData
    );
    const response = yield api.postMethod("live_videos_view", inputData);
    if (response.data.success) {
      yield put(fetchSingleLiveVideoSuccess(response.data.data));
    } else {
      yield put(fetchSingleLiveVideoFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSingleLiveVideoFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* liveStripeAPI() {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.liveStripe.inputData
    );
    const response = yield api.postMethod(
      "live_videos_payment_by_card",
      inputData
    );
    if (response.data.success) {
      yield put(livePaymentStripeSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign(window.location.origin +"/live-video/" +
        response.data.data.live_video_unique_id);
    } else {
      yield put(livePaymentStripeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(livePaymentStripeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* livePaypalAPI() {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.livePaypal.inputData
    );
    const response = yield api.postMethod(
      "live_videos_payment_by_paypal",
      inputData
    );
    if (response.data.success) {
      yield put(livePaymentPaypalSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
        
      window.location.assign(window.location.origin +"/live-video/" +
        response.data.data.live_video_unique_id);

    } else {
      yield put(livePaymentPaypalFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(livePaymentPaypalFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* liveViewerUpdateAPI() {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.liveViewerUpdate.inputData
    );
    const response = yield api.postMethod(
      "live_videos_viewer_update",
      inputData
    );
    if (response.data.success) {
      yield put(liveViewerUpdateSuccess(response.data.data));
      // const notificationMessage = getSuccessNotificationMessage(
      //   response.data.message
      // );
      // yield put(createNotification(notificationMessage));

    } else {
      yield put(liveViewerUpdateFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(liveViewerUpdateFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* liveEndAPI() {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.liveEnd.inputData
    );
    const response = yield api.postMethod(
      "live_videos_broadcast_stop",
      inputData
    );
    if (response.data.success) {
      yield put(liveVideoEndSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
        
      window.location.assign(window.location.origin +"/live-videos");

    } else {
      yield put(liveVideoEndFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(liveVideoEndFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* liveWalletAPI() {
  try {
    const inputData = yield select(
      (state) => state.liveVideo.liveWallet.inputData
    );
    const response = yield api.postMethod(
      "live_videos_payment_by_wallet",
      inputData
    );
    if (response.data.success) {
      yield put(livePaymentWalletSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign(window.location.origin +"/live-video/" +response.data.data.live_video_unique_id);

    } else {
      yield put(livePaymentWalletFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(livePaymentWalletFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}


export default function* pageSaga() {
  yield all([yield takeLatest(VIDEO_CALL_BROADCAST_START, liveVideoSaveAPI)]);
  yield all([yield takeLatest(FETCH_LIVE_VIDEOS_START, liveVideosAPI)]);
  yield all([yield takeLatest(FETCH_LIVE_VIDEOS_HISTORY_START, liveVideosHistoryAPI)]);
  // yield all([yield takeLatest(JOIN_LIVE_VIDEOS_START, joinLiveVideosAPI)]);
  yield all([yield takeLatest(FETCH_SINGLE_LIVE_VIDEOS_START, fetchSingleLiveVideoAPI)]);
  yield all([yield takeLatest(LIVE_VIDEOS_PAYMENT_BY_STRIPE_START, liveStripeAPI)]);
  yield all([yield takeLatest(LIVE_VIDEOS_PAYMENT_BY_PAYPAL_START, livePaypalAPI)]);
  yield all([yield takeLatest(LIVE_VIDEOS_VIEWER_UPDATE_START, liveViewerUpdateAPI)]);
  yield all([yield takeLatest(LIVE_VIDEOS_END_START, liveEndAPI)]);
  yield all([yield takeLatest(LIVE_VIDEOS_PAYMENT_BY_WALLET_START, liveWalletAPI)]);
}
