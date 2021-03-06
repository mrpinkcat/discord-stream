import Discord from 'discord.js';
import Debug from 'debug';

import * as models from '../models';

const debug = Debug('streamer:queue');

/** A guild queue is stored by their guild ID */
const queues: Discord.Collection<string, models.Track[]> = new Discord.Collection();

/**
 * Add the array of `Track` into the `guildQueue`. If the queue doesn't exists
 * for this guild, we create it. Returns the `guildQueue`.
 *
 * @param message the discord message that initiated this
 * @param tracks an array of `Track`
 */
export function addTracks(message: Discord.Message, tracks: models.Track[]): models.Track[] {
  const guildID = message.guild.id;
  const queueExists = queues.has(guildID);

  if (!queueExists) {
    queues.set(guildID, [...tracks]);
    debug('no guildQueue found for guildID: %s, created a new one', guildID);
    return tracks;
  } else {
    const guildQueue = queues.get(guildID)!;

    queues.set(guildID, [...guildQueue, ...tracks]);
    debug('guildQueue found for guildID: %s, added new tracks to it and now have %s tracks', guildID, [...guildQueue, ...tracks].length);
    return [...guildQueue, ...tracks];
  }
}

/**
 * Remove the first track from the `guildQueue`.
 * Returns the `guildQueue`.
 *
 * @param message the discord message that initiated this
 */
export function removeFirstTrack(message: Discord.Message): models.Track[] {
  const guildID = message.guild.id;
  const queueExists = queues.has(guildID);

  if (!queueExists) {
    debug('unexpected error, tried to remove the first track from a non-exising queue for guildID: %s', guildID);
    return [];
  } else {
    const guildQueue = queues.get(guildID)!;

    guildQueue.shift();

    (guildQueue.length === 0)
      ? queues.delete(guildID)
      : queues.set(guildID, guildQueue);

    debug('removed the first track from the guildQueue for guildID: %s, now have %s tracks', guildID, guildQueue.length);
    return guildQueue;
  }
}

/**
 * Similar to `Array#splice`, specify a range of tracks to remove from the
 * queue. Returns the new state of the `guildQueue`.
 *
 * @param startIndex index to start for `Array#splice`
 * @param endIndex index to end for `Array#splice`
 * @param message the Discord message that initiated this
 */
export function removeTracks(startIndex: number, endIndex: number, message: Discord.Message): models.Track[] {
  const guildID = message.guild.id;
  const queueExists = queues.has(guildID);

  if (!queueExists) {
    debug('unexpected error, tried to remove tracks from a non-exising queue for guildID: %s at startIndex %s and endIndex %s', guildID, startIndex, endIndex);
    return [];
  } else {
    const guildQueue = queues.get(guildID)!;
    const removed = guildQueue.splice(startIndex, endIndex);
    queues.set(guildID, guildQueue);

    debug('removed tracks %s (startIndex %s, endIndex %s) from the guildQueue for guildID: %s, now have %s tracks', removed.length, startIndex, endIndex, guildID, guildQueue.length);
    return guildQueue;
  }
}

/**
 * Delete a `guildQueue` if it exists for the current `guildID`.
 *
 * @param message the discord message that initiated this
 */
export function removeQueue(message: Discord.Message): void {
  const guildID = message.guild.id;
  const queueExists = queues.has(guildID);

  if (!queueExists) {
    debug('unexpected error, tried to remove a queue for guildID: %s but it doesn\'t exist', guildID);
    return;
  } else {
    queues.delete(guildID);
  }
}

/**
 * Returns the current queue for the guild where the message have been sent.
 *
 * @param message the discord message that initiated this
 */
export function getQueue(message: Discord.Message): models.Track[] {
  const guildID = message.guild.id;
  const queueExists = queues.has(guildID);

  if (!queueExists) {
    return [];
  } else {
    const guildQueue = queues.get(guildID)!;

    return guildQueue;
  }
}

/**
 * Returns the current track that the bot is playing for the guild where the
 * message have been sent.
 *
 * @param message the discord message that initiated this
 */
export function getCurrentTrack(message: Discord.Message): models.Track | void {
  const guildID = message.guild.id;
  const queueExists = queues.has(guildID);

  if (!queueExists) {
    return;
  } else {
    const guildQueue = queues.get(guildID)!;

    return guildQueue[0];
  }
}
