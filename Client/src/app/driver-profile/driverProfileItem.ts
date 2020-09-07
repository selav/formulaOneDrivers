import { Time } from '@angular/common';

export interface DriverProfileItem {
    like:Boolean,
    "race_id": Number,

    "avg_lap_time": String,
    "min_lap_time": String,
    "max_lap_time": String,
    "pit_stops_num": String,
    "pit_stops_min": String,
    "pit_stops_max": String,
    "circuit_name": String,
    "points": Number,
    "position_text": String,

    "race.race_id": Number,
    "race.year": Number,
    "race.name": String,
    "race.date": String,
}