const {drivers ,results ,races ,sequelize} = require('../models');

const _getDriversList = async () =>{
    const driversList = await drivers.findAll({
        attributes: [
            
            'driver_id', 
            'driver_ref', 
            "number", 
            'code', 
            'forename', 
            'surname', 
            //'position',
            [
                sequelize.literal(`(
                    SELECT MIN(DS.position)
                    FROM DRIVER_STANDINGS DS INNER JOIN RACES R ON R.RACE_ID = DS.RACE_ID
                    WHERE R.YEAR = DATE_PART('YEAR', NOW())
                    AND DS.driver_id = drivers.driver_id
                )`),
                'position'
            ],
            'nationality',
            //'points'
            [
                sequelize.literal(`(
                    SELECT SUM(DS.points)
                    FROM DRIVER_STANDINGS DS INNER JOIN RACES R ON R.RACE_ID = DS.RACE_ID
                    WHERE R.YEAR = DATE_PART('YEAR', NOW())
                    AND DS.driver_id = drivers.driver_id
                )`),
                'points'
            ],
            [
                sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM DRIVER_STANDINGS DS INNER JOIN RACES R ON R.RACE_ID = DS.RACE_ID
                    WHERE DS.WINS = 1
                    AND R.YEAR = DATE_PART('YEAR', NOW())
                    AND DS.driver_id = drivers.driver_id
                )`),
                'wins'
            ]        
        ],
        order: [
            [sequelize.literal('"wins"'), 'DESC']
        ]
    });
    return driversList;
}

const _getRacesDataByDriver = async (driverId) =>{
    
    const driverRacesData = await results.findAll({
        where:{
            driver_id: driverId
        },
        include: [races],
        
        attributes: [
            'race_id',
            
                
            
            [
                sequelize.literal(`(
                    SELECT AVG(MILLISECONDS) 
                    FROM LAP_TIMES LT WHERE LT.RACE_ID = results.RACE_ID 
                    AND LT.DRIVER_ID = results.DRIVER_ID
                )`),
                'avg_lap_time'
            ],

            [
                sequelize.literal(`(
                    SELECT MIN(MILLISECONDS) 
                    FROM LAP_TIMES LT 
                    WHERE LT.RACE_ID = results.RACE_ID 
                    AND LT.DRIVER_ID = results.DRIVER_ID
                )`),
                'min_lap_time'
            ], 
            
            [
                sequelize.literal(`(
                    SELECT MAX(MILLISECONDS) 
                    FROM LAP_TIMES LT 
                    WHERE LT.RACE_ID = results.RACE_ID 
                        AND LT.DRIVER_ID = results.DRIVER_ID
                )`),
                'max_lap_time',
            ],
            
            [
                sequelize.literal(`(
                    SELECT COUNT(*) 
                    FROM PIT_STOPS PT 
                    WHERE PT.RACE_ID = results.RACE_ID 
                        AND PT.DRIVER_ID = results.DRIVER_ID
                )`),                         
                'pit_stops_num'
            ],
            
            [
                sequelize.literal(`(
                    SELECT MIN(MILLISECONDS) 
                    FROM PIT_STOPS PT 
                    WHERE PT.RACE_ID = results.RACE_ID 
                        AND PT.DRIVER_ID = results.DRIVER_ID
                )`), 
                'pit_stops_min'
            ],
            
            [
                sequelize.literal(`(
                    SELECT MAX(MILLISECONDS)
                    FROM PIT_STOPS PT 
                    WHERE PT.RACE_ID = results.RACE_ID 
                        AND PT.DRIVER_ID = results.DRIVER_ID
                )`),
                'pit_stops_max'
            ],
            
            [
                sequelize.literal(`(
                    SELECT NAME FROM CIRCUITS C
                    WHERE race.circuit_id = C.CIRCUIT_ID
                )`), 
                'circuit_name'
            ],
            'points',
            'position_text',
        ],
        order: [
            [sequelize.literal('"race.year"'), 'DESC'],
            [sequelize.literal('"race.race_id"'), 'DESC'],
        ]
    })
    return driverRacesData;
}


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


module.exports = {
    getDriversList: async ()=>{
        const result = await _getDriversList();
        return result;
    },
    getRacesDataByDriver: async (driverId)=>{
        const result = await _getRacesDataByDriver(driverId);
        return result;
    }
}