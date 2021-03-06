import axios from "axios";
import { SpotifyService } from "./service";
import { serializeQuery } from "./util";

export type Query = {
  q: string;
  type: string[];
  include_external?: string;
  limit?: number;
  market?: string;
  offset?: number;
};

export type TrackInfo = {
  context_uri?: string;
  uris?: string[];
  offset?: Object;
  position_ms?: number;
};

export async function search(query: Query, service: SpotifyService) {
  let config = {
    headers: {
      Authorization: `Bearer ${service.retrieveToken()}`,
    },
  };

  try {
    let spotifyResult = await axios.get(
      `https://api.spotify.com/v1/search${serializeQuery(query)}`,
      config
    );
    return spotifyResult.data;
  } catch (e) {
    return e.response.data;
  }
}

export async function getUserProfile(service: SpotifyService) {
  let config = {
    headers: {
      Authorization: `Bearer ${service.retrieveUser().token}`,
    },
  };

  try {
    let spotifyResult = await axios.get(
      `https://api.spotify.com/v1/me`,
      config
    );

    return spotifyResult.data;
  } catch (e) {
    return e.response.data;
  }
}

export async function play(
  service: SpotifyService,
  deviceId: string,
  trackInfo?: TrackInfo
) {
  let config = {
    headers: {
      Authorization: `Bearer ${service.retrieveUser().token}`,
    },
  };

  try {
    let spotifyResult = await axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      trackInfo,
      config
    );

    return spotifyResult.data;
  } catch (e) {
    return e.response.data;
  }
}

export async function getDevices(service: SpotifyService) {
  let config = {
    headers: {
      Authorization: `Bearer ${service.retrieveUser().token}`,
    },
  };

  try {
    let spotifyResult = await axios.get(
      `https://api.spotify.com/v1/me/player/devices`,
      config
    );

    return spotifyResult.data;
  } catch (e) {
    return e.response.data;
  }
}

export async function pause(service: SpotifyService, deviceId: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${service.retrieveUser().token}`,
    },
  };

  try {
    let spotifyResult = await axios.put(
      `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
      {},
      config
    );

    return spotifyResult.data;
  } catch (e) {
    return e.response.data;
  }
}
