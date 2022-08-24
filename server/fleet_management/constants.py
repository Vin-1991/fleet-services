# Error descriptions
POPULAR_STATION_DATA_ERROR = "Something went wrong while preparing the data."
STATIONS_MOST_TURNOVER_RATE_DATA_ERROR = (
    "Something went wrong while preparing the stations data."
)
DISTRIBUTION_BIKE_RENTAL_DURATION_DATA_ERROR = (
    "Something went wrong while preparing the bike rental distribuition data."
)
STATIONS_MAP_DATA_ERROR = (
    "Something went wrong while preparing the stations location data."
)
DISTANCE_BETWEEN_TWO_STATIONS_DATA_ERROR = (
    "Something went wrong while preparing the average distance between two stations."
)
TABLE_NAME_REQUIRED = "Table name is required."

# Endpoints
TOP_TEN_POPULAR_STATIONS_ENDPOINT = "/popular-stations/"
STATIONS_MOST_TURNOVER_RATE_ENDPOINT = "/stations-most-turnover/"
DISTRIBUTION_BIKE_RENTAL_DURATION_ENDPOINT = "/rental-distribution/"
STATIONS_MAP_DATA_ENDPOINT = "/stations-map-data/"
DISTANCE_BETWEEN_TWO_STATIONS_ENDPOINT = "/stations-distance-data/"


# Queries
MOST_POPULAR_STATIONS_QUERY = """ select distinct c_hires.start_station_name,c_stn.bikes_count, 
                                        trim(to_char(c_hires.start_date::date,'Day')) as week_day 
                                        from bicycle_hires as c_hires join bicycle_stations as c_stn on 
                                        c_stn.id =c_hires.start_station_id
                                        where extract(dow from c_hires.start_date::date) BETWEEN 1
                                        AND 5 
                                        and 
                                        extract(dow from c_hires.end_date::date) BETWEEN 1
                                        AND 5
                                        order by c_stn.bikes_count desc
                                        fetch first 10 rows only
                            """


STATION_TURN_OVER_RATE_QUERY = """
                        WITH c AS
                                    (
                                    SELECT 
                                        start_station_id, 
                                        COUNT(*) as number_of_trips,
                                        Round(AVG(trip_duration_minutes)) AS avg_trip_duration_minutes
                                    FROM (
                                        SELECT
                                        start_station_id,
                                        extract(minute from end_date::timestamp - start_date::timestamp) AS trip_duration_minutes
                                        FROM bicycle_hires
                                    ) as subq
                                    GROUP BY start_station_id
                                    )
                                    SELECT 
                                        stn.id as station_id, 
                                        stn.name,
                                        c.number_of_trips,
                                        c.avg_trip_duration_minutes 
                                    FROM bicycle_stations AS stn
                                    LEFT JOIN c
                                    ON stn.id = c.start_station_id
                                    where  c.number_of_trips is not null and c.avg_trip_duration_minutes is not null
                                    ORDER BY  c.avg_trip_duration_minutes asc,c.number_of_trips asc
                                    fetch first {number_of_rows} rows only
                                """


STATION_MAP_DATA_QUERY = """ SELECT terminal_name as terminal_id, name as terminal_name, 
                            latitude,longitude from bicycle_stations """


DISTANCE_BETWEEN_TWO_STATIONS_QUERY = """
            WITH result_1 AS (
            SELECT  
                stations1.name AS start_st_name,  
                stations2.name AS end_st_name,
                (point(stations1.longitude, stations1.latitude) <@> point(stations2.longitude, stations2.latitude)) AS dist
            FROM bicycle_hires AS trips
            JOIN bicycle_stations AS stations1
                ON trips.start_station_id = stations1.id 
            JOIN bicycle_stations AS stations2
                ON trips.end_station_id = stations2.id
            ), result_2 AS (
            SELECT 
                split_part(start_st_name,',',1) As start_st_name,
                split_part(end_st_name,',',1) As end_st_name,
                round(avg(dist)::NUMERIC,2) AS average_distance
            FROM result_1
            GROUP BY start_st_name,end_st_name
            )
            SELECT *
            FROM result_2
            ORDER BY average_distance DESC
            fetch first 20 rows only   
"""
