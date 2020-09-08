const {
  drivers,
  results,
  races,
  driver_likes,
  sequelize,
} = require("../models");
const googleTokenValidator = require("../services/google-token-validator");

const _getDriversList = async () => {
  const CURRENT_YEAR = new Date().getFullYear(); //DATE_PART('YEAR', NOW())
  const driversList = await drivers.findAll({
    attributes: [
      "driver_id",
      "driver_ref",
      "number",
      "code",
      [sequelize.literal("forename || ' ' || surname"), "full_name"],
      //'position',
      [
        sequelize.literal(`(
                    SELECT MIN(DS.position)
                    FROM DRIVER_STANDINGS DS INNER JOIN RACES R ON R.RACE_ID = DS.RACE_ID
                    WHERE R.YEAR = ${CURRENT_YEAR}
                    AND DS.driver_id = drivers.driver_id
                )`),
        "position",
      ],
      "nationality",
      //'points'
      [
        sequelize.literal(`(
                    SELECT SUM(DS.points)
                    FROM DRIVER_STANDINGS DS INNER JOIN RACES R ON R.RACE_ID = DS.RACE_ID
                    WHERE R.YEAR = ${CURRENT_YEAR}
                    AND DS.driver_id = drivers.driver_id
                )`),
        "points",
      ],
      [
        sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM DRIVER_STANDINGS DS INNER JOIN RACES R ON R.RACE_ID = DS.RACE_ID
                    WHERE DS.WINS = 1
                    AND R.YEAR = ${CURRENT_YEAR}
                    AND DS.driver_id = drivers.driver_id
                )`),
        "wins",
      ],
    ],
    order: [
      [sequelize.literal('"wins"'), "DESC"],
      [sequelize.literal('"points"'), "DESC NULLS LAST"],
      [sequelize.literal("surname || forename")],
    ],
  });
  return driversList;
};

const _getRacesDataByDriver = async (driverId, token) => {
  /*

    SELECT 
    r.race_id,
    r.name race_name,
    r.year,
    (select avg(milliseconds) from lap_times lt where lt.race_id = r.race_id and lt.driver_id = rs.driver_id) avg_lap_time,
    (select min(milliseconds) from lap_times lt where lt.race_id = r.race_id and lt.driver_id = rs.driver_id) min_lap_time,
    (select max(milliseconds) from lap_times lt where lt.race_id = r.race_id and lt.driver_id = rs.driver_id) max_lap_time,
    (select count(*) from pit_stops pt where pt.race_id = r.race_id and pt.driver_id = rs.driver_id) pit_stops_num,
    (select min(duration) from pit_stops pt where pt.race_id = r.race_id and pt.driver_id = rs.driver_id) pit_stops_min,
    (select max(duration) from pit_stops pt where pt.race_id = r.race_id and pt.driver_id = rs.driver_id) pit_stops_max,
    (select name from circuits c where r.circuit_id = c.circuit_id) circuit_name,
    rs.points,
    rs.position
        FROM results rs 
        inner join races r on r.race_id = rs.race_id
        and rs.driver_id = 20
        
        order by r.year desc, r.race_id desc
*/
  const driverRacesData = await results.findAll({
    where: {
      driver_id: driverId,
    },

    attributes: [
      "race_id",

      [
        sequelize.literal(`(
                    SELECT TO_CHAR((AVG(MILLISECONDS) || ' milliseconds')::interval, 'MI:SS') 
                    FROM LAP_TIMES LT WHERE LT.RACE_ID = results.RACE_ID 
                    AND LT.DRIVER_ID = results.DRIVER_ID
                )`),
        "avg_lap_time",
      ],

      [
        sequelize.literal(`(
                    SELECT TO_CHAR((MIN(MILLISECONDS) || ' milliseconds')::interval, 'MI:SS') 
                    FROM LAP_TIMES LT 
                    WHERE LT.RACE_ID = results.RACE_ID 
                    AND LT.DRIVER_ID = results.DRIVER_ID
                )`),
        "min_lap_time",
      ],

      [
        sequelize.literal(`(
                    SELECT TO_CHAR((MAX(MILLISECONDS) || ' milliseconds')::interval, 'MI:SS') 
                    FROM LAP_TIMES LT 
                    WHERE LT.RACE_ID = results.RACE_ID 
                        AND LT.DRIVER_ID = results.DRIVER_ID
                )`),
        "max_lap_time",
      ],

      [
        sequelize.literal(`(
                    SELECT COUNT(*) 
                    FROM PIT_STOPS PT 
                    WHERE PT.RACE_ID = results.RACE_ID 
                        AND PT.DRIVER_ID = results.DRIVER_ID
                )`),
        "pit_stops_num",
      ],

      [
        sequelize.literal(`(
                    SELECT TO_CHAR((MIN(MILLISECONDS) || ' milliseconds')::interval, 'MI:SS') 
                    FROM PIT_STOPS PT 
                    WHERE PT.RACE_ID = results.RACE_ID 
                        AND PT.DRIVER_ID = results.DRIVER_ID
                )`),
        "pit_stops_min",
      ],

      [
        sequelize.literal(`(
                    SELECT TO_CHAR((MAX(MILLISECONDS) || ' milliseconds')::interval, 'MI:SS') 
                    FROM PIT_STOPS PT 
                    WHERE PT.RACE_ID = results.RACE_ID 
                        AND PT.DRIVER_ID = results.DRIVER_ID
                )`),
        "pit_stops_max",
      ],

      [
        sequelize.literal(`(
                    SELECT NAME FROM CIRCUITS C
                    WHERE race.circuit_id = C.CIRCUIT_ID
                )`),
        "circuit_name",
      ],
      "points",
      "position_text",
    ],
    order: [
      [sequelize.literal('"race.year"'), "DESC"],
      [sequelize.literal('"race.race_id"'), "DESC"],
    ],
    include: [
      {
        model: races,
        attributes: [
          "race_id",
          "year",
          "name",
          [sequelize.literal("date || ' ' || race.time"), "date"],
        ],
      },
    ],
    raw: true,
  });
  return driverRacesData;
};

const _likeDriver = async (token, driverId, likeState) => {
  //console.log({token,driverId,likeState})
  const user_id = await googleTokenValidator.verify(token);
  if (!user_id) {
    throw new Error("cannot get user id from token");
  }
  let driver_id;
  try {
    driver_id = Number.parseInt(driverId);
  } catch (err) {
    throw new Error(`Error parsing driver id to int. ${err}`);
  }

  if (likeState) {
    //like
    await driver_likes.upsert({
      driver_id,
      user_id,
    });
    return true;
  } else {
    //unlike
    await driver_likes.destroy({
      where: {
        driver_id,
        user_id,
      },
    });
    return false;
  }
};

const _isLiked = async (token, driverId) => {
  //console.log({token,driverId,likeState})
  const user_id = await googleTokenValidator.verify(token).catch((e) => null);
  let driver_id;
  try {
    driver_id = Number.parseInt(driverId);
  } catch (err) {
    throw new Error(`Error parsing driver id to int. ${err}`);
  }

  const likeExists = await driver_likes.count({
    where: {
      driver_id,
      user_id,
    },
  });
  return likeExists > 0;
};

const _getDriverData = async (driverId) => {
  const driverData = await drivers.findAll({
    where: {
      driver_id: driverId,
    },
    attributes:[
        "driver_id",
        "code",
        [sequelize.literal("forename || ' ' || surname"), "full_name"],
        "dob",
        "nationality",
    ]
  });
  return driverData;
};

module.exports = {
  getDriversList: async () => {
    const result = await _getDriversList();
    return result;
  },
  getRacesDataByDriver: async (driverId, token) => {
    const result = await _getRacesDataByDriver(driverId, token);
    return result;
  },
  getDriverData: async (driverId) => {
    const result = await _getDriverData(driverId);
    return result;
  },

  likeDriver: async (token, driverId, likeState) => {
    const result = await _likeDriver(token, driverId, likeState);
    return result;
  },
  isLiked: async (token, driverId) => {
    const result = await _isLiked(token, driverId);
    return result;
  },
};
