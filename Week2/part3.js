// Answer for question 4 in part2 as MySQL statement!
/*
WITH region_language AS (
    SELECT
        name AS country,
        region,
        Language AS official_lan
    FROM
        country AS c
    JOIN
        countrylanguage AS l
    ON
        c.Code = l.CountryCode
    WHERE
        l.IsOfficial = 'T'
    GROUP BY
        country, region, official_lan
), matched_country AS (
    SELECT
        a.region,
        a.official_lan,
        a.country AS country
    FROM
        region_language AS a
    JOIN
        region_language AS b
    ON
        a.region = b.region
    AND
        a.official_lan = b.official_lan
    AND
        a.country <> b.country
    GROUP BY
        region, official_lan, country
) SELECT
    region, official_lan,
    COUNT(*) AS n_country,
    GROUP_CONCAT(country SEPARATOR ',') AS country_names
FROM
    matched_country
GROUP BY
    region, official_lan
ORDER BY
    n_country DESC
    */