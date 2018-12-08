import * as firebase from 'firebase';
import { GeoCallbackRegistration } from './geoCallbackRegistration';
import { QueryCriteria } from './interfaces';
/**
 * Creates a GeoQuery instance.
 */
export declare class GeoQuery {
    private _firebaseRef;
    private _callbacks;
    private _cancelled;
    private _center;
    private _currentGeohashesQueried;
    private _locationsTracked;
    private _radius;
    private _valueEventFired;
    private _outstandingGeohashReadyEvents;
    private _geohashCleanupScheduled;
    private _cleanUpCurrentGeohashesQueriedInterval;
    private _cleanUpCurrentGeohashesQueriedTimeout;
    /**
   * @param _firebaseRef A Firebase reference where the GeoFire data will be stored.
   * @param queryCriteria The criteria which specifies the query's center and radius.
   */
    constructor(_firebaseRef: firebase.database.Reference, queryCriteria: QueryCriteria);
    /********************/
    /********************/
    /**
   * Terminates this query so that it no longer sends location updates. All callbacks attached to this
   * query via on() will be cancelled. This query can no longer be used in the future.
   */
    cancel(): void;
    /**
   * Returns the location signifying the center of this query.
   *
   * @returns The [latitude, longitude] pair signifying the center of this query.
   */
    center(): number[];
    /**
   * Attaches a callback to this query which will be run when the provided eventType fires. Valid eventType
   * values are 'ready', 'key_entered', 'key_exited', and 'key_moved'. The ready event callback is passed no
   * parameters. All other callbacks will be passed three parameters: (1) the location's key, (2) the location's
   * [latitude, longitude] pair, and (3) the distance, in kilometers, from the location to this query's center
   *
   * 'ready' is used to signify that this query has loaded its initial state and is up-to-date with its corresponding
   * GeoFire instance. 'ready' fires when this query has loaded all of the initial data from GeoFire and fired all
   * other events for that data. It also fires every time updateCriteria() is called, after all other events have
   * fired for the updated query.
   *
   * 'key_entered' fires when a key enters this query. This can happen when a key moves from a location outside of
   * this query to one inside of it or when a key is written to GeoFire for the first time and it falls within
   * this query.
   *
   * 'key_exited' fires when a key moves from a location inside of this query to one outside of it. If the key was
   * entirely removed from GeoFire, both the location and distance passed to the callback will be null.
   *
   * 'key_moved' fires when a key which is already in this query moves to another location inside of it.
   *
   * Returns a GeoCallbackRegistration which can be used to cancel the callback. You can add as many callbacks
   * as you would like for the same eventType by repeatedly calling on(). Each one will get called when its
   * corresponding eventType fires. Each callback must be cancelled individually.
   *
   * @param eventType The event type for which to attach the callback. One of 'ready', 'key_entered',
   * 'key_exited', or 'key_moved'.
   * @param callback Callback function to be called when an event of type eventType fires.
   * @returns A callback registration which can be used to cancel the provided callback.
   */
    on(eventType: string, callback: Function): GeoCallbackRegistration;
    /**
   * Returns the radius of this query, in kilometers.
   *
   * @returns The radius of this query, in kilometers.
   */
    radius(): number;
    /**
   * Updates the criteria for this query.
   *
   * @param newQueryCriteria The criteria which specifies the query's center and radius.
   */
    updateCriteria(newQueryCriteria: QueryCriteria): void;
    /*********************/
    /*********************/
    /**
   * Turns off all callbacks for the provide geohash query.
   *
   * @param query The geohash query.
   * @param queryState An object storing the current state of the query.
   */
    private _cancelGeohashQuery;
    /**
   * Callback for child added events.
   *
   * @param locationDataSnapshot A snapshot of the data stored for this location.
   */
    private _childAddedCallback;
    /**
   * Callback for child changed events
   *
   * @param locationDataSnapshot A snapshot of the data stored for this location.
   */
    private _childChangedCallback;
    /**
   * Callback for child removed events
   *
   * @param locationDataSnapshot A snapshot of the data stored for this location.
   */
    private _childRemovedCallback;
    /**
   * Removes unnecessary Firebase queries which are currently being queried.
   */
    private _cleanUpCurrentGeohashesQueried;
    /**
   * Fires each callback for the provided eventType, passing it provided key's data.
   *
   * @param eventType The event type whose callbacks to fire. One of 'key_entered', 'key_exited', or 'key_moved'.
   * @param key The key of the location for which to fire the callbacks.
   * @param location The location as [latitude, longitude] pair
   * @param distanceFromCenter The distance from the center or null.
   */
    private _fireCallbacksForKey;
    /**
   * Fires each callback for the 'ready' event.
   */
    private _fireReadyEventCallbacks;
    /**
   * Checks if this geohash is currently part of any of the geohash queries.
   *
   * @param geohash The geohash.
   * @returns Returns true if the geohash is part of any of the current geohash queries.
   */
    private _geohashInSomeQuery;
    /**
   * Called once all geohash queries have received all child added events and fires the ready
   * event if necessary.
   */
    private _geohashQueryReadyCallback;
    /**
   * Attaches listeners to Firebase which track when new geohashes are added within this query's
   * bounding box.
   */
    private _listenForNewGeohashes;
    /**
   * Encodes a query as a string for easier indexing and equality.
   *
   * @param query The query to encode.
   * @returns The encoded query as string.
   */
    private _queryToString;
    /**
   * Removes the location from the local state and fires any events if necessary.
   *
   * @param key The key to be removed.
   * @param currentLocation The current location as [latitude, longitude] pair or null if removed.
   */
    private _removeLocation;
    /**
   * Decodes a query string to a query
   *
   * @param str The encoded query.
   * @returns The decoded query as a [start, end] pair.
   */
    private _stringToQuery;
    /**
   * Callback for any updates to locations. Will update the information about a key and fire any necessary
   * events every time the key's location changes.
   *
   * When a key is removed from GeoFire or the query, this function will be called with null and performs
   * any necessary cleanup.
   *
   * @param key The key of the geofire location.
   * @param location The location as [latitude, longitude] pair.
   */
    private _updateLocation;
}
