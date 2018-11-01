export interface SoundcloudResponse {
  kind: string;
}

export interface SoundcloudTrack {
  kind: 'track';
  id: number;
  created_at: string;
  user_id: number;
  duration: number;
  commentable: boolean;
  last_modified: string;
  sharing: string;
  tag_list: string;
  permalink: string;
  streamable: boolean;
  genre: string;
  title: string;
  description: string;
  uri: string;
  permalink_url: string;
  artwork_url: string;
  stream_url: string;
  download_url: string;
  playback_count: number;
  favoritings_count: number;
  reposts_count: number;
  comment_count: number;
  attachments_uri: string;
  user: SoundcloudUserPeek;
}

export interface SoundcloudPlaylist {
  duration: number;
  permalink_url: string;
  reposts_count: number;
  description: string;
  uri: string;
  tag_list: string;
  track_count: number;
  user_id: number;
  tracks: SoundcloudTrack[];
}

export interface SoundcloudUserPeek {
  id: number;
  kind: 'user';
  username: string;
  uri: string;
  permalink_url: string;
  avatar_url: string;
}

export interface SoundcloudUser {
  id: number;
  kind: 'user';
  username: string;
  uri: string;
  permalink_url: string;
  avatar_url: string;
  country: string;
  first_name: string;
  last_name: string;
  full_name: string;
  description: string;
  city: string;
  website: string;
  track_count: number;
  playlist_count: number;
  public_favorites_count: number;
  followers_count: number;
  followings_count: number;
  reposts_count: number;
}

export interface SoundcloudError {
  errors: [{
    error_message: string;
  }];
}
